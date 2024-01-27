import bcrypt from "bcrypt";


export class Security {

    /* The `hashingPassword` method in the `Security` class is responsible for generating a hashed
    password using the bcrypt library. */
    public static hashingPassword = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }


    /* The `comparePassword` method is a static method of the `Security` class. It takes two
    parameters: `systemPassword` and `enteredPassword`, both of type string. */
    public static comparePassword = async (systemPassword: string, enteredPassword: string): Promise<boolean> => {
        try {
            return await bcrypt.compare(enteredPassword, systemPassword);
        } catch (error) {
            throw error;
        }
    }

}