import { Response, Request } from "express"

import passportConfig from "../config/passportConfig";

async function googleLogin(res: Response, req: Request) {
    passportConfig.authenticate("google", { scope: ["profile", "email"] });
   res.sendStatus(200);
}


export default{
   googleLogin
}