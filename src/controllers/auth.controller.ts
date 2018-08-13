import BaseController from "../policies/BaseController";
import { Request, Response, Next } from "restify";

export default class LoginController extends BaseController {
  constructor() {
    super();
  }
  authUser = async (req: Request, res: Response, next: Next) => {
    try {
      return res.send("hello there - " + req.params.name);
    } catch (error) {
      this.ErrorResult(error, req, res, next);
    }
  };
}
