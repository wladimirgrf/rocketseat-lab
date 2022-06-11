import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => [Student])
  students() {
    return this.studentsService.findAllStudents();
  }
}
