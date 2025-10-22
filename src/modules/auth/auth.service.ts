// auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { schema } from '@/database/schema';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { randomUUID, randomBytes, createHash } from 'crypto';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { GoogleOAuthUser } from './types/google-oauth-user';

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

@Injectable()
export class AuthService {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async findOrCreateUser(oauth: GoogleOAuthUser) {
    const acc = await this.db
      .select()
      .from(schema.accounts)
      .where(
        and(
          eq(schema.accounts.providerId, 'google'),
          eq(schema.accounts.accountId, oauth.providerAccountId),
        ),
      )
      .limit(1);

    if (acc.length) {
      const [user] = await this.db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, acc[0].userId))
        .limit(1);
      return user;
    }

    const userId = randomUUID();
    const [user] = await this.db
      .insert(schema.users)
      .values({
        id: userId,
        email: oauth.email,
        name: oauth.name!,
        image: oauth.image ?? null,
      })
      .returning();

    await this.db.insert(schema.accounts).values({
      accountId: oauth.providerAccountId,
      providerId: 'google',
      userId,
    });

    return user;
  }

  async createSession(params: {
    userId: string;
    ip?: string | null;
    userAgent?: string | null;
    ttlSeconds?: number;
  }) {
    const token = randomBytes(48).toString('base64url');
    const tokenHash = hashToken(token);
    const expires = new Date(
      Date.now() + (params.ttlSeconds ?? 15 * 24 * 60 * 60) * 1000,
    );

    await this.db.insert(schema.sessions).values({
      id: randomUUID(),
      token: tokenHash,
      userId: params.userId,
      ipAddress: params.ip ?? null,
      userAgent: params.userAgent ?? null,
      expiresAt: expires,
    });

    return { token, expires };
  }

  async validateSession(rawToken: string) {
    const tokenHash = hashToken(rawToken);
    const [session] = await this.db
      .select()
      .from(schema.sessions)
      .where(eq(schema.sessions.token, tokenHash))
      .limit(1);
    if (!session) return null;
    if (session.expiresAt && session.expiresAt.getTime() < Date.now())
      return null;

    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, session.userId))
      .limit(1);

    return user ?? null;
  }

  async revokeSession(rawToken: string) {
    const tokenHash = hashToken(rawToken);
    await this.db
      .delete(schema.sessions)
      .where(eq(schema.sessions.token, tokenHash));
  }
}
