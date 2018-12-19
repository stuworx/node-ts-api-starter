import { Server } from "restify";
import AuthController from "../controllers/auth.controller";
import { IsAuthenticated } from "../policies/Authorizer";
export default function routeDefinition(server: Server) {
  const auth = new AuthController();
  server.get("/hello", auth.authUser);
  server.get("/hello/:name", auth.authUser);
}
