import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Model, Types } from 'mongoose';
import { CourseDocument } from './entities/course.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CourseLevel } from './enums/courseLevel.enum';
import { CourseStatus } from './enums/courseStatus.enum';
import { NotFoundException } from '@nestjs/common';
import { Category } from '../categories/entities/category.entity';
import { CategoryDocument } from '../categories/entities/category.entity';
import { ApiResponse } from '@/common/dto/api-response.dto';
import { Lesson, LessonDocument } from '../lessons/entities/lesson.entity';
import { UploadService } from '@/upload/upload.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,

    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,

    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
    private readonly uploadService: UploadService,
  ) {}
  async create(createCourseDto: CreateCourseDto,file?: Express.Multer.File): Promise<Course> {
    const category = await this.categoryModel.findById(
      createCourseDto.category,
    );
    if (!category){
      throw new NotFoundException('Cant search Category in Course');
    }
    let thumbnailUrl = createCourseDto.thumbnail || '';
    if (file) {
      const uploadResult = await this.uploadService.uploadFile(file);
      thumbnailUrl = uploadResult.url; 
    }
    const createCourse = await this.courseModel.create({
      ...createCourseDto,
      thumbnail: thumbnailUrl,
      level: CourseLevel.BEGINNER,
      status: CourseStatus.ACTIVE,
    });
    return createCourse;
  }

  async findAll(): Promise<ApiResponse<Course[]>> {
    const courses = await this.courseModel.find().populate("category", "category_name").lean().exec()
    return new ApiResponse( "Danh sách khóa học",courses);
  }

  // async findOne(id: string): Promise<Course> {
  //   const course = await this.courseModel.findById(id).populate("category", "category_name");
  //   if (!course) {
  //     throw new UnauthorizedException('Course not exist');
  //   }
  //   return course;
  // }

  async findOne(id: string): Promise<ApiResponse<any>> {
  const course = await this.courseModel
    .findById(id)
    .populate('category', 'category_name')
    .lean();

  if (!course) {
    throw new NotFoundException('Không tìm thấy khóa học');
  }

  const lessons = await this.lessonModel
    .find({ course_id: id })
    .sort({ lesson_order: 1 })
    .lean();

  return new ApiResponse('Chi tiết khóa học', {
    ...course,
    lessons,
  });
}

  async update(id: string, updateCourseDto: UpdateCourseDto,file?: Express.Multer.File,): Promise<Course> {
    let thumbnailUrl = updateCourseDto.thumbnail;
    if (file) {
      const uploadResult = await this.uploadService.uploadFile(file);
      thumbnailUrl = uploadResult.url; 
      updateCourseDto.thumbnail = thumbnailUrl;
    }
    const updated = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updated) {
      throw new NotFoundException('Course not found');
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.courseModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Course not found ');
  }
}
