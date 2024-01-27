import express from "express";
import { ProductController } from "@api/controller/product.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";

class ProductRoute {
    public router: express.Router = express.Router();
    private productController: ProductController;
    private httpRequestValidator: HttpRequestValidator;
    private authenticate;

    constructor() {
        this.productController = new ProductController();
        this.httpRequestValidator = new HttpRequestValidator();
        const authMiddleware = new AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }

    private assign(): void {
        this.router.get("/",
            this.authenticate,
            this.productController.getProducts);
    }
}

export default new ProductRoute().router;
