import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";

export class BaseController {
  private responseParser: ResponseParser;

  constructor() {
    this.responseParser = new ResponseParser();
  }

  public defaultCheck = (req: Request, res: Response): void => {
    this.responseParser
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody({})
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };
}
