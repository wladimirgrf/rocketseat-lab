import { Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../models/course';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private coursesService: CoursesService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.findAllCourses();
  }
}
