// src/auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import type { GoogleOAuthUser } from './types/google-oauth-user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['profile', 'email'],
    });
  }

  // Tipar o retorno evita "unsafe-assignment" depois
  validate(_: string, __: string, profile: Profile): GoogleOAuthUser {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      // lance erro cedo, evita acessar membros indefinidos
      throw new Error('Google profile has no email');
    }
    return {
      provider: 'google',
      providerAccountId: profile.id,
      email,
      name: profile.displayName,
      image: profile.photos?.[0]?.value,
    };
  }
}
