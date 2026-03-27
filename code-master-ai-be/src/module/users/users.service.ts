import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { hashPasswordHelper } from '@/helpers/util';
import {
  CodeAuthDto,
  CreateAuthDto,
  changePasswordAuthDto,
} from '@/auth/dto/create-auth.dto';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import aqp from 'api-query-params';
import * as crypto from 'crypto';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}

  isEmailExist = async (email: string) => {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  };

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;

    // check Email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email đã tồn tại: ${email}, vui lòng sử dụng email khác`,
      );
    }

    // hash password
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      image,
    });

    return { _id: user._id };
  }

  async findAll(query: any, current: number, pageSize: number) {
    // const { filter, sort } = aqp(query);
    const { default: aqp } = await import('api-query-params');
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    // Tối ưu hiệu suất bằng countDocuments
    const totalItems = await this.userModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * +pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return { results, totalPages };
  }

  async findOne(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('ID không đúng định dạng MongoDB');
    }
    return await this.userModel.findById(id).select('-password');
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    );
  }

  remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return this.userModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Id không đúng định dạng MongoDB');
    }
  }
  // LUỒNG XÁC THỰC (AUTH) VÀ GỬI MAIL
  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;

    if (await this.isEmailExist(email)) {
      throw new BadRequestException(
        `Email đã tồn tại: ${email}, vui lòng sử dụng email khác`,
      );
    }

    const hashPassword = await hashPasswordHelper(password);
    // Thay thế uuidv4() bằng crypto.randomUUID() để sửa lỗi ESM
    const codeId = crypto.randomUUID();
    let defaultRole = await this.roleModel.findOne({ role_name: 'user' });
    if (!defaultRole) {
      defaultRole = await this.roleModel.create({
        role_name: 'user',
        description: 'Tài khoản người học mặc định',
      });
    }
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      role_id: defaultRole?._id,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes'),
    });

    await this.mailerService.sendMail({
      to: user.email!, // Thêm ! để tránh lỗi TS
      subject: 'Kích hoạt tài khoản CodeMaster AI',
      template: 'register',
      context: { name: user?.name ?? user.email, activationCode: codeId },
    });

    return { _id: user._id, email: user.email };
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      _id: data._id,
      codeId: data.code,
    });

    if (!user)
      throw new BadRequestException(
        'Mã xác nhận không hợp lệ hoặc tài khoản không tồn tại',
      );
    if (dayjs().isAfter(user.codeExpired))
      throw new BadRequestException('Mã xác nhận đã hết hạn');

    await this.userModel.updateOne(
      { _id: data._id },
      { isActive: true, codeId: null, codeExpired: null },
    );

    return { success: true, message: 'Kích hoạt tài khoản thành công' };
  }

  async retryActive(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new BadRequestException('Tài khoản người dùng không tồn tại');
    if (user.isActive)
      throw new BadRequestException('Tài khoản này đã được kích hoạt');

    const codeId = crypto.randomUUID();
    await user.updateOne({ codeId, codeExpired: dayjs().add(5, 'minutes') });

    this.mailerService.sendMail({
      to: user.email!,
      subject: 'Gửi lại mã kích hoạt CodeMaster AI',
      template: 'register',
      context: { name: user.name ?? user.email, activationCode: codeId },
    });

    return { _id: user._id };
  }

  async retryPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new BadRequestException('Tài khoản người dùng không tồn tại');

    const codeId = crypto.randomUUID();
    await user.updateOne({ codeId, codeExpired: dayjs().add(5, 'minutes') });

    this.mailerService.sendMail({
      to: user.email!,
      subject: 'Yêu cầu khôi phục mật khẩu CodeMaster AI',
      template: 'register',
      context: { name: user.name ?? user.email, activationCode: codeId },
    });

    return { _id: user._id, email: user.email };
  }

  async changePassword(data: changePasswordAuthDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Mật khẩu và xác nhận mật khẩu không khớp');
    }

    const user = await this.userModel.findOne({
      email: data.email,
      codeId: data.code,
    });

    if (!user)
      throw new BadRequestException(
        'Mã xác nhận không hợp lệ hoặc tài khoản không tồn tại',
      );
    if (dayjs().isAfter(user.codeExpired))
      throw new BadRequestException('Mã xác nhận đã hết hạn');

    const newPassword = await hashPasswordHelper(data.password);

    await user.updateOne({
      password: newPassword,
      codeId: null,
      codeExpired: null,
    });

    return { success: true, message: 'Thay đổi mật khẩu thành công' };
  }
  // login google
  async createGoogleUser(profile: any) {
    const user = this.userModel.create({
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar,
      googleId: profile.googleId,
      provider: 'google',
      isActive: true, // Đăng nhập Google thì tự động kích hoạt luôn
    });
    return user;
  }
}
