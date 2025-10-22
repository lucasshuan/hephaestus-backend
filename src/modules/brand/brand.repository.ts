import { NewBrand } from '@/database/entities/brand.entity';
import { schema } from '@/database/schema';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';

@Injectable()
export class BrandRepository {
  constructor(
    @InjectDrizzle() private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async selectAll() {
    return await this.db.select().from(schema.brands);
  }

  async insert(input: NewBrand) {
    const rows = await this.db.insert(schema.brands).values(input).returning();
    return rows[0];
  }

  async update(id: string, input: Partial<NewBrand>) {
    return this.db
      .update(schema.brands)
      .set(input)
      .where(eq(schema.brands.id, id))
      .returning();
  }
}
