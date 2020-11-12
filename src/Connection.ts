import * as cookie from "cookie";
import { IncomingHttpHeaders } from "http";
import * as _ from "lodash";
import * as soap from "soap";
import { parse as parseUrl } from "url";

import * as dto from "./types";

type SoapMethodCallback<Params, Result> = (params: Params, callback: (
  err: Error | null,
  result: {
    returnval: Result;
  } | null,
  rawResponse: string,
  soapHeaders: Record<string, string>,
  rawRequest: string
) => void) => void;

export class Connection {
  constructor(
    readonly client: soap.Client
  ) { }

  get hostname(): string {
    const { hostname } = parseUrl(this.client.lastEndpoint ?? "");
    if (hostname === null) {
      throw new Error(`Couldn't get hostname from URL "${this.client.lastEndpoint ?? "unknown URL"}"`);
    }
    return hostname;
  }

  /**
   * Executes a SOAP command
   * @returns result and headers
   */
  async exec<Params, Result>(command: string, params: Params): Promise<{
    result: Result;
    headers: IncomingHttpHeaders;
  }> {
    // remove "connection" members to avoid circular references
    const paramsClone = this.sanitizeParams(_.cloneDeep(params));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const callback = this.client.VimService.VimPort[command] as SoapMethodCallback<Params, Result>;
    const result = await new Promise<Result>((resolve, reject) => {
      callback(paramsClone as unknown as Params, (err, res) => {
        if (err) {
          return reject(err);
        }
        if (res === null) {
          return reject(new Error("No result returned from vSphere"));
        }
        resolve(res.returnval);
      });
    });
    return { result, headers: this.client.lastResponseHeaders ?? {} };
  }

  async login(username: string, password: string): Promise<void> {
    const serviceContent = await this.getContent();
    try {
      const res = await this.exec("Login", {
        _this: serviceContent.sessionManager,
        userName: username,
        password
      });
      // make sure we use VMWare's session cookie
      const header = res.headers["set-cookie"];
      if (header && header.length > 0) {
        const sessionId = cookie.parse(header[0]).vmware_soap_session;
        this.client.addHttpHeader("Cookie", cookie.serialize("vmware_soap_session", sessionId));
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes("Cannot complete login due to an incorrect user name or password.")) {
        throw new Error("vSphere rejected login credentials");
      }
      throw err;
    }
  }

  /** Wrapper to provide easy access to ServiceContent instance */
  getContent(): Promise<dto.ServiceContent> {
    return new dto.ServiceInstance(this).retrieveContent();
  }

  /** Recursively remove "connection" properties from an object */
  private sanitizeParams<Params>(params: Params): Params {
    (Object.keys(params) as (keyof Params)[]).forEach(key => {
      if (key === "connection") {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete params[key];
      } else if (typeof params[key] === "object") {
        this.sanitizeParams(params[key]);
      }
    });
    return params;
  }
}
