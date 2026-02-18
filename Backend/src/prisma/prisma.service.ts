import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString || typeof connectionString !== 'string') {
      throw new Error(
        'DATABASE_URL is missing or not a string. Please set a valid connection string (e.g. postgresql://user:password@host:5432/dbname).',
      );
    }

    const adapter = new PrismaPg({
      connectionString,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected successfully');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Database connection closed');
  }
}
