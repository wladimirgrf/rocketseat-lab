import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from '../../../services/enrollments.service';

import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Student])
  students() {
    return this.studentsService.findAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.findEnrollmentsByStudentId(student.id);
  }
}
