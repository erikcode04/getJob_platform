// types.d.ts
import { Profile } from 'passport-google-oauth20';

declare global {
  namespace Express {
    interface User {
      id: string;
      displayName: string;
      email: string;
      profilePicture?: string;
      // Add other properties as needed
    }
  }
}