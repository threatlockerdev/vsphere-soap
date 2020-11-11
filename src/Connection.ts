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
      throw new Error(`Couldn't get hostname from URL "${this.client.lastEndpoint ?? "unknown"}"`);
    }
    return hostname;
  }

  async exec<Params, Result>(command: string, params: Params): Promise<{
    result: Result;
    headers: IncomingHttpHeaders;
  }> {
    const paramsClone = _.cloneDeep(params) as unknown as Record<string, { connection?: Connection }>;
    Object.keys(paramsClone).forEach(key => {
      if (typeof paramsClone[key] === "object" && "connection" in paramsClone[key]) {
        delete paramsClone[key].connection;
      }
    });
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

  getContent(): Promise<dto.ServiceContent> {
    return new dto.ServiceInstance(this).retrieveContent();
  }

  /*
  async getItem<Item extends { id: string }>(type: string, id: string): Promise<Item | undefined> {
    const items = await this.getItems<Item>(type, [id]);
    return items[0];
  }

  async getItems<Item extends { id: string }>(type: string, ids: string[]): Promise<Item[]> {
    const items = await this.getAllItems<Item>(type);
    return items.filter(i => ids.includes(i.id));
  }

  async getAllItems<Item>(type: string): Promise<Item[]> {
    const content = await this.getServiceContent();
    const { result: containerView } = await this.exec<"CreateContainerView", Item>("CreateContainerView", {
      _this: content.viewManager,
      container: content.rootFolder,
      type: [type],
      recursive: true
    });
    const { result } = await this.exec<"RetrievePropertiesEx", Item>("RetrievePropertiesEx", {
      _this: content.propertyCollector,
      specSet: [{
        attributes: {
          "xsi:type": "PropertyFilterSpec"
        },
        propSet: [{
          attributes: {
            "xsi:type": "PropertySpec"
          },
          type,
          all: true
        }],
        objectSet: [{
          attributes: {
            "xsi:type": "ObjectSpec"
          },
          obj: containerView,
          skip: true,
          selectSet: [{
            attributes: {
              "xsi:type": "TraversalSpec"
            },
            type: "ContainerView",
            path: "view",
            skip: false
          }]
        }]
      }],
      options: {}
    });
    return result.objects.map(obj => VmwareClient.convertResultObject(obj));
  }

  static convertResultObject<Item>({ obj, propSet }: IResultObject<Item>): Item {
    return Object.fromEntries(propSet.map(prop => {
      if ("ManagedObjectReference" in prop.val) {
        return [prop.name, prop.val.ManagedObjectReference.map(r => r.$value)];
      } else if ("$value" in prop.val) {
        return [prop.name, prop.val.$value];
      } else {
        return [prop.name, prop.val];
      }
    }).concat([["id", obj.$value]])) as Item;
  }

  */
}
