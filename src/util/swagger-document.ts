import path from "path";
import { SWAGGER_URL } from "@config/secret";

const SwaggerDocument = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "REST API for Define",
      version: "0.0.6",
      description: "This is the REST API for Define",
    },
    host: `${SWAGGER_URL}`,
    basePath: "/",
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        bearerAuth: [] as string[],
      },
    ],
    schemes: ["https", "http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
  explorer: true,
  apis: [path.join(__dirname, "..", "..", "swagger-doc", "*.yaml")],
};

export default SwaggerDocument;
