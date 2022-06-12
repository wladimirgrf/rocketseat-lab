import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { CoursesService } from '../../../services/courses.service';
import { Course } from '../models/course';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateCourseInput } from '../inputs/create-course-input';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { StudentsService } from '../../../services/students.service';
import { EnrollmentsService } from '../../../services/enrollments.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Course])
  courses() {
    return this.coursesService.findAllCourses();
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Course)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentsService.findStudentByAuthUserId(
      user.sub,
    );

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment =
      await this.enrollmentsService.findEnrollmentsByCourseIdAndStudentId({
        courseId: id,
        studentId: student.id,
      });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.findCourseById(id);
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Course)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
