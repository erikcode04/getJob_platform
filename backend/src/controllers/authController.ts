import e, { Response, Request, NextFunction } from "express";
import passport, { Profile } from "passport";
import authService from "../services/authService";
import { UserPayload } from "../types/interfaces";
import { auth } from "google-auth-library";

interface Reqruiter {
    firstName : string,
    lastName : string,  
    email : string,
    password : string,
    reqruiter : boolean,
    company : string
}



export const googleLogin = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
};

export const callback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
       const user: any = await new Promise((resolve, reject) => {
           passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }, (err, user, info) => {
               if (err) {
                   return reject(new Error("Internal Server Error"));
               }
               if (!user) {
                   return reject(new Error("Unauthorized"));
               }
               resolve(user);
           })(req, res, next);
       });

       console.log(user);

       const fixatedUser: UserPayload = {
           id: user.id,
           displayName: user.displayName,
           email: user.email,
           reqruiter : false
       };

       console.log("fixatedUser");
       const token: string = await authService.googleGenerateJwt(fixatedUser);
       console.log("token inside callback");
       console.log(token);
       res.cookie("token", token, {
           httpOnly: true,
           secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
           sameSite: 'strict'
       });
       res.redirect("http://localhost:3000");
   } catch (error: any) {
       console.log(error);
       res.status(500).json({ message: error.message });
   }
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
   console.log("inside authenticateToken");
   console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
       res.status(401).json({ message: "Unauthorized" });
    }
    const user = authService.decodeJwt(token);
    if (!user) {
     res.status(401).json({ message: "Unauthorized" });
    }
   res.status(200).json(user);
};

export const signup = (req: Request, res: Response, next: NextFunction): void => {
    const { firstName, lastName, email, password, reqruiter, company } = req.body;
    console.log(firstName, lastName, email, password, reqruiter, company);
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
    }
    if (reqruiter) {
   const user: Reqruiter = {
         firstName,
         lastName,
         email,
         password,
         reqruiter,
         company
        };
        authService.reqruiterSignup(user)
    .then(response => {
        console.log("response after signup", response);
        if (response === 1) {
            console.log("User created successfully");   
            res.send("User created successfully");
        }
        else {
            console.log("User already exists");
            res.status(400).json({ message: "User already exists" });
        }
    })
    .catch(error => {
        console.error("Error during signup", error);
    });
  
    }
    else {
        console.log("not reqruiter");
       const response:number = authService.signup();
         if (response === 1) {
              console.log("User created successfully");
              res.send("User created successfully");
         }
         else {
              console.log("User already exists");
              res.status(400).json({ message: "User already exists" });
         }
    }
};          