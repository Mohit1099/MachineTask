import path from "path";
import * as bodyParser from "body-parser";
import { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import i18n from "i18n";
import { RequestIDMiddleware } from "@middleware/request-id";
import errorMiddleware from "@middleware/error";
import SwaggerDocument from "@util/swagger-document";
import { ENVIRONMENT } from "@config/secret";
import constant from "@config/constant";
import { requestCtx } from "@middleware/request-ctx-middleware";
import { dbConnection, disconnect } from "@database/db-connection";

export class Kernel {
  private requestId: RequestIDMiddleware = new RequestIDMiddleware();

  public initBodyParser(app: Application): void {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  public addRequestId(app: Application): void {
    app.use(this.requestId.assign);
  }

  public attachRequestContext(app: Application): void {
    app.use(requestCtx);
  }

  public errorMiddleware(app: Application): void {
    app.use(errorMiddleware);
  }

  public databaseConnection(): Promise<void> {
    // establish database connection
    const connect = dbConnection();
    return connect;
  }

  public disconnectDatabase(): Promise<void> {
    // disconnect database connection
    const revoke = disconnect();
    return revoke;
  }

  public initTranslation(app: Application): void {
    i18n.configure({
      locales: [constant.ENGLISH_LOCALE, constant.SPANISH_LOCALE],
      defaultLocale: constant.ENGLISH_LOCALE,
      queryParameter: "lang",
      directory: path.join(__dirname, "..", "..", "locales"),
    });
    app.use(i18n.init);
  }

  public setupSwagger(app: Application): void {
    if (constant.PRODUCTION !== ENVIRONMENT) {
      const swaggerSpecV1 = swaggerJSDoc(SwaggerDocument);
      app.use("/docs", swaggerUi.serveFiles(swaggerSpecV1));
      app.get("/docs", (req, res) => {
        res.send(swaggerUi.generateHTML(swaggerSpecV1));
      });
    }
  }

  public addCommonMiddleware(app: Application): void {
    app.use(this.requestId.assign);
    const corsOptions = {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      allowedHeaders: "*",
      exposedHeaders: "*",
      optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
  }

}
