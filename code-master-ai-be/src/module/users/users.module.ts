import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Role, RoleSchema } from '../roles/entities/role.entity';
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [
    // Đây là dòng "ma thuật" để giải quyết lỗi UnknownDependenciesException
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
    UploadModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
