import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import type { FastifyRequest } from 'fastify';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  private getSessionCookie(val: unknown): string | null {
    if (typeof val !== 'object' || val === null) return null;
    const rec = val as Record<string, unknown>;
    return typeof rec.session === 'string' ? rec.session : null;
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();

    const token = this.getSessionCookie(req.cookies);
    if (!token) {
      throw new UnauthorizedException('Missing session cookie');
    }

    const user = await this.auth.validateSession(token);
    if (!user) {
      throw new UnauthorizedException('Invalid or expired session');
    }

    req.user = user;
    return true;
  }
}
