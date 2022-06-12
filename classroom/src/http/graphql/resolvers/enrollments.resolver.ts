import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { Enrollment } from '../models/enrollment';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Enrollment])
  enrollments() {
    return this.enrollmentsService.findAllEnrollments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrollment) {
    return this.studentsService.findStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrollment) {
    return this.coursesService.findCourseById(enrollment.courseId);
  }
}
