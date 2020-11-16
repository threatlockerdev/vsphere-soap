# vsphere-soap

Typescript client for vSphere's SOAP API.

## Usage

`npm i @hyperqube/vsphere-soap soap && npm i -D @types/soap`

```typescript
import { Connection } from "@hyperqube/vsphere-soap";
import * as soap from "soap";

const main = async () => {
  const client = await soap.createClientAsync("your url");
  const connection = new Connection(client);
  await connection.login("username", "password");
  
  const content = await connection.getContent();

  // do whatever from here; for instance,
  const containerView = await content.viewManager?.createContainerView({ ... });
  await content.propertyCollector.retrievePropertiesEx({ ... });
};
```
