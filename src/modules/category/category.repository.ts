import { NewCategory } from '@/database/entities/category.entity';
import { schema } from '@/database/schema';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async selectAll() {
    return await this.db.select().from(schema.categories);
  }

  async insert(input: NewCategory) {
    const rows = await this.db
      .insert(schema.categories)
      .values(input)
      .returning();
    return rows[0];
  }

  async update(id: string, input: Partial<NewCategory>) {
    return this.db
      .update(schema.categories)
      .set(input)
      .where(eq(schema.categories.id, id))
      .returning();
  }
}
