import express from "express";
import { AuthController } from "@api/controller/user.controller";
import { createUser } from "@api/validator/user.Validator";
import { HttpRequestValidator } from "@middleware/http-request-validator";

class UserRoute {
  public router: express.Router = express.Router();
  private authController: AuthController;
  private httpRequestValidator: HttpRequestValidator;

  constructor() {
    this.authController = new AuthController();
    this.httpRequestValidator = new HttpRequestValidator();
    this.assign();
  }

  private assign(): void {
    this.router.post(
      "/register",
      this.httpRequestValidator.validate("body", createUser),
      this.authController.signUp);

    this.router.post(
      "/login",
      this.httpRequestValidator.validate("body", createUser),
      this.authController.login);
  }
}

export default new UserRoute().router;
