import { Router } from "express";
import passport from '../config/passportConfig';

const router = Router();


router.get('/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log("Google Auth Callback");
    res.redirect('http://localhost:3000/Homepage');
  }
);

export default router;