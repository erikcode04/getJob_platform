import jwt from 'jsonwebtoken';
import { Profile } from 'passport';
import dotenv from 'dotenv';


dotenv.config();
interface UserPayload {
    email: string;
    displayName: string;
      id : string;
      reqruiter : boolean;
  }
  


  interface Token {
    Promise: string;
  }

async function googleGenerateJwt(user: UserPayload): Promise<string>  {

    try{
        console.log("user inside authService", user);
         const token:string = jwt.sign(user, process.env.JWT_SECRET || "", { expiresIn: '1h',
        });
        console.log("token inside generateJwt", token);
       return token;
    }
    catch(err: any){
       throw new Error(err);
    }
}

export function decodeJwt(token: string): UserPayload | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as UserPayload;
        console.log("decoded inside decodeJwt", decoded);
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export default {
    googleGenerateJwt,
    decodeJwt
}