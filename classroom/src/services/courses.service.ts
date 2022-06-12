import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  findAllCourses() {
    return this.prisma.course.findMany();
  }

  findCourseById(id: string) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }
}
