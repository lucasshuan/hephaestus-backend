import { NewComponent } from '@/database/entities/component.entity';
import { schema } from '@/database/schema';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class ComponentRepository {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async selectAll() {
    return await this.db.select().from(schema.components);
  }

  async insert(input: NewComponent) {
    const rows = await this.db
      .insert(schema.components)
      .values(input)
      .returning();
    return rows[0];
  }

  async update(id: string, input: Partial<NewComponent>) {
    return this.db
      .update(schema.components)
      .set(input)
      .where(eq(schema.components.id, id))
      .returning();
  }
}
