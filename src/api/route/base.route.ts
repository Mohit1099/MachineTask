import express from "express";
import { BaseController } from "@api/controller/base.controller";

class BaseRoute {
  public router: express.Router = express.Router();
  private baseController: BaseController;

  constructor() {
    this.baseController = new BaseController();
    this.assign();
  }

  private assign(): void {
    this.router.get("/", this.baseController.defaultCheck);
  }
}

export default new BaseRoute().router;
