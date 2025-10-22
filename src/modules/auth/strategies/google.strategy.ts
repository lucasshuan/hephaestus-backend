import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import type { GoogleOAuthUser } from '../types/google-oauth-user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(config: ConfigService) {
    super({
      clientID: config.getOrThrow('GOOGLE_CLIENT_ID'),
      clientSecret: config.getOrThrow('GOOGLE_CLIENT_SECRET'),
      callbackURL: config.getOrThrow('API_BASE_URL') + '/auth/google/callback',
      scope: ['profile', 'email'],
    });
  }

  validate(_: string, __: string, profile: Profile): GoogleOAuthUser {
    const email = profile.emails?.[0]?.value;
    if (!email) {
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
