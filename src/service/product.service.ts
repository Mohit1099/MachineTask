import createError from "http-errors";
import i18n from "i18n";
import axios from "axios";
import { PRODUCT_URL } from "@config/secret";
import { Product, fetchProducts } from "@type/product";



export class ProductService {
    constructor() {
    }

    /* The `getProducts` method is a public method of the `ProductService` class. It is an asynchronous
    method that returns a promise. The promise resolves to an object with keys as strings and values
    as arrays of `Product` objects. */
    public getProducts = async (): Promise<{ [key: string]: Product[] }> => {
        const productData = await this.fetchProducts();

        if (productData.products.length === 0) {
            throw new createError.NotFound(i18n.__('Products not found'));
        }

        return productData.products.reduce((segregatedProducts, product) => {
            const { category, title, price, thumbnail } = product;

            if (!segregatedProducts[category]) {
                segregatedProducts[category] = [];
            }

            segregatedProducts[category].push({ title, price, thumbnail });

            return segregatedProducts;
        }, {} as { [key: string]: Product[] });
    };



    /* The `fetchProducts` method is a public method of the `ProductService` class. It is an
    asynchronous method that returns a promise. */
    public fetchProducts = async (): Promise<fetchProducts> => {
        try {
            const { data } = await axios.get(PRODUCT_URL);
            return data;
        } catch (error) {
            console.error(error);
            throw new createError.InternalServerError(i18n.__('Internal Server Error'));
        }
    };


}
