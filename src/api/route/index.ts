import { Application } from "express";
import BaseRoute from "./base.route";
import UserRoute from "./user.route";
import ProductRoute from "./product.route";


export class Routes {
  constructor() { }
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use(BaseRoute);
    app.use("/user", UserRoute);
    app.use("/product", ProductRoute);
  }
}
