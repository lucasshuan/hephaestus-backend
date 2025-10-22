import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  private getSessionCookie(val: unknown): string | null {
    if (typeof val !== 'object' || val === null) return null;
    const rec = val as Record<string, unknown>;
    return typeof rec.session === 'string' ? rec.session : null;
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<Request>();

    const token = this.getSessionCookie(req.cookies);
    if (!token) return false;

    const user = await this.auth.validateSession(token);
    if (!user) return false;

    req.user = user;
    return true;
  }
}
