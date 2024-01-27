import User from "@database/model/user.model";
import { registerUser } from "@type/user";

const UserRepo = {
  async findByUsername(username: string): Promise<registerUser> {
    return User.findOne({ username });
  },
  async registerUser(username: string, password: string): Promise<registerUser> {
    return User.create({ username, password });
  }

};

export default UserRepo;
