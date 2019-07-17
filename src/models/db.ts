import { createConnection, set } from "mongoose";

import SCHEMAS from "./schema";
import * as dbtypes from "./dbtypes";

const mongoPath = process.env.MONGO_PATH;
set("debug", true);
set("useCreateIndex", true);
set("useFindAndModify", false);

const connection = createConnection(mongoPath, { useNewUrlParser: true, config: { autoIndex: true } });

export const db = {
  customers: connection.model<dbtypes.ICustomers>("customers", SCHEMAS.customerSchema),
};
