import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Role, RoleSchema } from '../roles/entities/role.entity';
<<<<<<< HEAD

@Module({
  imports: [
    // Đây là dòng "ma thuật" để giải quyết lỗi UnknownDependenciesException
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
=======
import { UploadModule } from '@/upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Role.name, schema: RoleSchema },]),
    UploadModule
>>>>>>> 346bb36e7977a31228eb3b08959be79a54710e4a
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
