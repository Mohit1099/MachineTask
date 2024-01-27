import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { ProductService } from "@service/product.service";

export class ProductController {
    private responseParser: ResponseParser;
    private productService: ProductService;
    constructor() {
        this.responseParser = new ResponseParser();
        this.productService = new ProductService();
    }

    public getProducts = async (req: Request, res: Response): Promise<void> => {
        const products = await this.productService.getProducts();
        this.responseParser
            .setStatus(true)
            .setHttpCode(constant.HTTP_STATUS_OK)
            .setBody(products)
            .setMessage(i18n.__("SUCCESS"))
            .send(res);
    };



}
