import { Request, Response, NextFunction } from "express";
import i18n from "i18n";
import * as jwt from "jsonwebtoken";
import createError from "http-errors";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { JWT_SECRET, JWT_EXPIRY } from "@config/secret";
import { JWT } from "@type/user";

declare module "express" {
  export interface Request {
    user: Record<string, unknown>;
  }
}

export class AuthenticateRequest {
  /**
   * Global middleware to check request is autneticated of not
   * @param req
   * @param res
   * @param next
   */
  public validate(req: Request, res: Response, next: NextFunction): void {
    const token = req.header("x-auth-token");

    if (!token) {
      const responseParser = new ResponseParser();
      responseParser
        .setHttpCode(constant.HTTP_STATUS_UNAUTHORIZED)
        .setStatus(false)
        .setResponseCode("unauthorized")
        .setMessage(i18n.__("unauthorized"))
        .setBody({})
        .send(res);
      return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.debug("decoded-token", "AuthenticateRequest.validate", {
      decodedToken,
    });
    if (!decodedToken) {
      throw new createError.Unauthorized(i18n.__("invalidToken"));
    }
    req.user = JSON.parse(JSON.stringify(decodedToken));

    // passing usr context to logger
    console.info({ _id: req.user._id });
    next();
  }

  public generateToken(user: JWT): string {
    const token = jwt.sign(
      {
        _id: user._id.toString(),
        username: user.username,
        password: user.password,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRY, // expires in 14 days
      }
    );
    return token;
  }
}
