import UserRepo from "@database/repository/user.repository";
import createError from "http-errors";
import { Security } from "@util/security";
import i18n from "i18n";
import { registerUser } from "@type/user";
import { AuthenticateRequest } from "@middleware/authenticate-request";


export class UserService {
  private authenticateRequest;
  constructor() {
    this.authenticateRequest = new AuthenticateRequest();
  }


  /* The `registerUser` method is a public method of the `UserService` class. It takes in two
  parameters, `username` and `password`, both of type string. It returns a Promise that resolves to
  an object of type `registerUser`. */
  public registerUser = async (username: string, password: string): Promise<registerUser> => {
    // check duplicate username
    const user = await UserRepo.findByUsername(username);
    if (user) {
      throw new createError.Conflict(i18n.__("Username already exists"));
    }
    const hashedpassword = await Security.hashingPassword(password);
    const registerUser = await UserRepo.registerUser(username, hashedpassword);
    return registerUser;

  }

  /* The `loginUser` method is a public method of the `UserService` class. It takes in two parameters,
  `username` and `password`, both of type string. */
  public loginUser = async (username: string, password: string): Promise<any> => {
    const user = await UserRepo.findByUsername(username);
    if (!user) {
      throw new createError.NotFound(i18n.__("Username not found"));
    }
    const isPasswordMatch = await Security.comparePassword(user.password, password);
    if (!isPasswordMatch) {
      throw new createError.Unauthorized(i18n.__("Invalid password"));
    }
    const token = this.authenticateRequest.generateToken(user);
    return { token };
  }

}
