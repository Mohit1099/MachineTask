import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { UserService } from "@service/user.service";

export class AuthController {
  private responseParser: ResponseParser;
  private userService: UserService;
  constructor() {
    this.responseParser = new ResponseParser();
    this.userService = new UserService();
  }

  public signUp = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const data = await this.userService.registerUser(username, password);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(data)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const data = await this.userService.loginUser(username, password);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(data)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };


}
