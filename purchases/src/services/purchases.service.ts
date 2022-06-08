import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
