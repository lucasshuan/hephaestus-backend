import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { GoogleOAuthUser } from './types/google-oauth-user';
import { SessionGuard } from './guards/session.guard';
import { ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

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

  @ApiCookieAuth('session')
  @ApiOperation({
    summary: 'Get me',
    description: 'Get current logged in user.',
  })
  @Get('me')
  @UseGuards(SessionGuard)
  me(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Google OAuth',
    description: 'Redirect to Google OAuth.',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  google() {}

  @ApiCookieAuth('session')
  @ApiOperation({
    summary: 'Google OAuth callback',
    description: 'Callback for Google OAuth.',
  })
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
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

  @ApiCookieAuth('session')
  @ApiOperation({
    summary: 'Logout',
    description: 'Revokes the session and clears the cookie.',
  })
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const token =
      req.cookies && typeof req.cookies.session === 'string'
        ? req.cookies.session
        : null;

    if (token) {
      await this.auth.revokeSession(token);
    }

    res.clearCookie('session', {
      path: '/',
      domain: process.env.COOKIE_DOMAIN || undefined,
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
    });

    return res.status(200).json({ success: true });
  }
}
