// src/auth/auth.controller.ts
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { GoogleOAuthUser } from './types/google-oauth-user';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  private isGoogleOAuthUser(u: unknown): u is GoogleOAuthUser {
    if (!u || typeof u !== 'object') return false;
    const o = u as Record<string, unknown>;
    return (
      o.provider === 'google' &&
      typeof o.providerAccountId === 'string' &&
      typeof o.email === 'string'
    );
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCb(@Req() req: Request, @Res() res: Response) {
    if (!this.isGoogleOAuthUser(req.user)) {
      return res.status(400).send('Invalid OAuth payload');
    }

    const user = await this.auth.findOrCreateUser(req.user);

    const ua =
      typeof req.headers['user-agent'] === 'string'
        ? req.headers['user-agent']
        : null;
    const ip = typeof req.ip === 'string' ? req.ip : null;

    const { token, expires } = await this.auth.createSession({
      userId: user.id,
      ip,
      userAgent: ua,
    });

    res.cookie('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: Math.max(0, expires.getTime() - Date.now()),
      domain: process.env.COOKIE_DOMAIN || undefined,
    });

    res.redirect(process.env.AFTER_LOGIN_REDIRECT_URL || '/');
  }
}
