import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  findAllStudents() {
    return this.prisma.student.findMany();
  }

  findStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  findStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: { authUserId },
    });
  }
}
