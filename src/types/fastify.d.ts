import 'fastify';

type UserEntity = import('../database/entities/user.entity').User;

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserEntity;
    cookies?: Record<string, string>;
  }
}
