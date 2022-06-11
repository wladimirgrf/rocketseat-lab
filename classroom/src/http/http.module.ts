import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesService } from '../services/courses.service';
import { StudentsService } from '../services/students.service';
import { EnrollmentsService } from '../services/enrollments.service';

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
    CoursesResolver,
    StudentsResolver,
    EnrollmentsResolver,

    // GraphQL services
    CoursesService,
    StudentsService,
    EnrollmentsService,
  ],
})
export class HttpModule {}
