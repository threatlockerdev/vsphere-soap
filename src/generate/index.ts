/* eslint-disable no-console */

import * as childProcess from "child_process";
import { promises as fs } from "fs";

import { PyDefinitions } from "./PyDefinitions";
import { TypeGenerator } from "./TypeGenerator";

const createDefinitions = async (): Promise<PyDefinitions> => {
  const vmomiFilename = `${__dirname}/../../pyVmomi/types.json`;

  await new Promise((resolve, reject) => {
    childProcess.exec(`python -m generate ${vmomiFilename}`, (err, stdout, stderr) => {
      if (err || stderr) {
        return reject(new Error(err?.message ?? stderr));
      }
      resolve(stdout);
    });
  });

  return JSON.parse(await fs.readFile(vmomiFilename, "utf8")) as PyDefinitions;
};

const main = async (): Promise<void> => {
  const [outputFilename] = process.argv.slice(2);
  if (!outputFilename) {
    return console.error("Usage: yarn generate <filename>");
  }

  const definitions = await createDefinitions();

  await fs.writeFile(outputFilename, new TypeGenerator(definitions).generate());
};

main().catch(err => console.error("An error occurred", err));
