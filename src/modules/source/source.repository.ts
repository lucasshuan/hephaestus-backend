import { NewSource } from '@/database/entities/source.entity';
import { schema } from '@/database/schema';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class SourceRepository {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async selectAll() {
    return await this.db.select().from(schema.sources);
  }

  async insert(input: NewSource) {
    const rows = await this.db.insert(schema.sources).values(input).returning();
    return rows[0];
  }

  async update(id: string, input: Partial<NewSource>) {
    return this.db
      .update(schema.sources)
      .set(input)
      .where(eq(schema.sources.id, id))
      .returning();
  }
}
