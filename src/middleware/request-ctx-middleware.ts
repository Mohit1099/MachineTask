import { Request, Response, NextFunction } from "express";

/**
 * Global middleware to assign "requestId" to async storage
 * @param req
 * @param res
 * @param next
 */
export function requestCtx(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const reqCtxObj: Record<string, unknown> = {
    url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
    method: req.method,
    request_id: res.get("x-request-id"),
  };
  next();
}
