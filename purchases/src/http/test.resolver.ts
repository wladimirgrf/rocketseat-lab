import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => String)
  hello() {
    return 'TEST GRAPHQL';
  }
}
