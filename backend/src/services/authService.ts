import jwt from 'jsonwebtoken';
import { Reqruiter, IUser } from '../models/userSchema';
import dotenv from 'dotenv';



dotenv.config();
interface UserPayload {
    email: string;
    displayName: string;
      id : string;
      reqruiter : boolean;
  }

  interface Reqruiter {
    firstName : string,
    lastName : string,  
    email : string,
    password : string,
    reqruiter : boolean,
    company? : string
}
interface User {
  firstName : string,
  lastName : string,  
  email : string,
  password : string,
  reqruiter : boolean,
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

export async function signup(user: IUser): Promise<number> {
  console.log("user inside signup", user);
  if (!user) {
    throw new Error("User not found");
  }
  try {
   const mailCheck = await Reqruiter.find({ email : user.email});
   if (mailCheck.length > 0) {
     return 0;
   }
   else {
     Reqruiter.create(user);
    return 1;
    }
  } catch (error) {
    return 0;
  }

}

export async function reqruiterSignup(user : Reqruiter): Promise<number> {
  console.log("user inside reqruiterSignup", user);
  if (!user) {
    throw new Error("User not found");
  }
  try {
   const userNameCheck = await Reqruiter.find({ firstName : user.firstName});
   if (userNameCheck.length > 0) {
     return 0;
   }
   const mailCheck = await Reqruiter.find({ email : user.email});
   if (mailCheck.length > 0) {
     return 0;
   }
   else {
     const response = await Reqruiter.create(user);
     console.log("response inside reqruiterSignup", response);
    return 1;
    }
  } catch (error) {
    return 0;
  }

}


export default {
    googleGenerateJwt,
    decodeJwt,
    signup,
    reqruiterSignup

}