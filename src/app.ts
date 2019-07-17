require("dotenv").config();
import { createServer, plugins } from "restify";
import { logger } from "./policies/InitApp";
import routeDefinition from "./routes";
import corsMiddleware = require("restify-cors-middleware");

logger.debug("✔ Logger initialised");

let server = createServer();
server.use(plugins.dateParser());
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
// server.server.setTimeout(60000 * 0.5);

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["at"],
  exposeHeaders: [],
});

server.pre(cors.preflight);
server.use(cors.actual);

server.pre((req, _, next) => {
  logger.debug(req.method, req.url, " => ", req.headers["host"]);
  next();
});

routeDefinition(server);
server.get("/", (_, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8"
  });
  res.write("<h1 style='font-family:monospace;text-align:center;font-size:72px'><br/><br/><br/>🚀<br/>API is Ready! </h1>");
  return res.end();
});
server.listen(process.env.PORT, function() {
  logger.info("=---------------------------------------------------=");
  logger.info("env -> ", process.env.NODE_CONFIG_ENV);
  logger.info("=---------------------------------------------------=");
  logger.info("API HOSTED ON => http://localhost:%s", process.env.PORT);
  logger.info("=---------------------------------------------------=");
});
