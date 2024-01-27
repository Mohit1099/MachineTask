import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import { ResponseParser } from "@util/response-parser";

export class HttpRequestValidator {
  private responseParser: ResponseParser;

  constructor() {
    this.responseParser = new ResponseParser();
  }

  /**
   * Private method to validate data againt Joi schema
   *
   * @param data
   * @param schema
   */
  public validate(
    type: "body" | "params" | "query",
    schema: Joi.ObjectSchema<unknown>
  ) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const reqType = this.requestType(type);
      const data = req[reqType];
      const { error } = schema.validate(data);
      if (error === undefined) {
        next();
        return;
      }
      this.handleValidationError(error);
      this.responseParser.send(res);
    };
  }

  /**
   * The function validates an array in the request body, params, or query against a given schema and
   * handles any validation errors.
   * @param {"body" | "params" | "query"} type - The "type" parameter is a string that specifies the
   * type of data to validate. It can have one of three values: "body", "params", or "query".
   * @param schema - The `schema` parameter is a Joi schema object that defines the validation rules
   * for the array data.
   * @returns a middleware function that takes in a request, response, and next function as parameters.
   */
  public validateArray(
    type: "body" | "params" | "query",
    schema: Joi.ArraySchema
  ) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const reqType = this.requestType(type);
      const data = req[reqType];
      const { error } = schema.validate(data);
      if (error === undefined) {
        next();
        return;
      }
      this.handleValidationError(error);
      this.responseParser.send(res);
    };
  }

  public requestType = (
    type: "body" | "params" | "query"
  ): "body" | "params" | "query" => type;

  private async handleValidationError(
    error: Joi.ValidationError
  ): Promise<void> {
    const err: Record<string, unknown>[] = [];
    error.details.forEach((element: Joi.ValidationErrorItem) => {
      err.push({
        message: element.message,
        label: element.context.key,
      });
    });
    this.responseParser
      .setHttpCode(400)
      .setStatus(false)
      .setResponseCode("validation_error")
      .setMessage("Validation Error")
      .setBody(err);
  }
}
