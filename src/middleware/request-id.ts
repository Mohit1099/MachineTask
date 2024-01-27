import { Request, Response, NextFunction } from "express";
import { v1 as uuid } from "uuid";

export class RequestIDMiddleware {
  /**
   * Global middleware to assign header "x-request-id" to response
   * @param req
   * @param res
   * @param next
   */
  public assign(req: Request, res: Response, next: NextFunction): void {
    const requestID = uuid();
    res.set("x-request-id", requestID);
    next();
  }
}
