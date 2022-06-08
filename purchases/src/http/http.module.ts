import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';

import { ApolloDriver } from '@nestjs/apollo';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from '../services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from '../services/purchases.service';
import { CustomersService } from '../services/customers.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
  ],
  providers: [
    // GraphQL resolvers
    ProductsResolver,
    PurchasesResolver,

    // GraphQL services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
