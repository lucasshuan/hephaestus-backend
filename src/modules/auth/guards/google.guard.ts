import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { FastifyReply, FastifyRequest } from 'fastify';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  getAuthenticateOptions() {
    return { scope: ['profile', 'email'] };
  }

  getRequest(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    return req.raw ?? req;
  }

  getResponse(context: ExecutionContext) {
    const res = context.switchToHttp().getResponse<FastifyReply>();
    return res.raw ?? res;
  }
}
