import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@/module/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import {
  changePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;
    return user;
  }

  async login(user: any, res: any) {

    const accessExpire = process.env.JWT_ACCESS_EXPIRE || '15m';
    const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '7d';
    const accessCookieAge = parseInt(process.env.COOKIE_ACCESS_MAX_AGE as string, 10) || 900000;
    const refreshCookieAge = parseInt(process.env.COOKIE_REFRESH_MAX_AGE as string, 10) || 604800000;

    const payload = { username: user.email, sub: user._id };
    // song 15'
    const token = this.jwtService.sign(payload, { expiresIn: accessExpire as any});
    // song 7 ngay
    const refreshToken = this.jwtService.sign(payload, { expiresIn: refreshExpire as any });

    await this.usersService.updateRefreshToken(user._id, refreshToken);
    // await this.userModel.findByIdAndUpdate(user._id, {
    //   refreshToken: refreshToken,
    // });
    // Set Access Token vào Cookie (15 phút)
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessCookieAge, // 15 phút
    });

    //  Set Refresh Token vào Cookie (7 ngày)
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/v1/auth/refresh', //  Cookie này CHỈ gửi đi khi gọi API refresh
      // path:'/',
      maxAge: refreshCookieAge, // 7 ngày
    });
    return res.status(HttpStatus.OK).json({
      user: { email: user.email, _id: user._id, name: user.name },
      message: 'Đăng nhập thành công!',
    });

    // return res.status(HttpStatus.OK).json({
    //   user: { email: user.email, _id: user._id, name: user.name },
    //   access_token: token,
    // });
  }

  // Refresh token
  async refreshToken(req: any, res: any) {
    const accessExpire = process.env.JWT_ACCESS_EXPIRE || '15m';
  const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '7d';
  const accessCookieAge =
    parseInt(process.env.COOKIE_ACCESS_MAX_AGE as string, 10) || 900000;
  const refreshCookieAge =
    parseInt(process.env.COOKIE_REFRESH_MAX_AGE as string, 10) || 604800000;
    try {
      // Lấy refresh token từ cookie
      const refreshToken = req.cookies['refresh_token'];
      if (!refreshToken) {
        throw new UnauthorizedException(
          'Không tìm thấy Refresh Token. Vui lòng login lại!',
        );
      }

      // Verify token xem còn hạn không
      const decoded = this.jwtService.verify(refreshToken); 

      // Kiểm tra DB xem token này có khớp với token lưu ở User không (Chống token giả mạo)
      // const user = await this.userModel.findById(decoded.sub);
      const user = await this.usersService.refreshID(decoded.sub);
      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException(
          'Refresh Token không hợp lệ hoặc đã bị thu hồi!',
        );
      }
      //  Cấp Access Token MỚI
      const payload = { username: user.email, sub: user._id };
      console.log("cap access token moi");
      const newAccessToken = this.jwtService.sign(payload, {
        expiresIn: accessExpire as any,
      });
      const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshExpire as any,
    });
    await this.usersService.updateRefreshToken(user._id.toString(), newRefreshToken);
     const cookieBase = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

      // Cập nhật lại Cookie Access Token
      res.cookie('access_token', newAccessToken, {
      ...cookieBase,
      maxAge: accessCookieAge,
    });
    res.cookie('refresh_token', newRefreshToken, {
      ...cookieBase,
      path: '/api/v1/auth/refresh',
      // path: '/',
      maxAge: refreshCookieAge,
    });

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Làm mới Token thành công!' });
    } catch (error) {
      // Nếu lỗi (hết hạn, sai token), xóa sạch cookie bắt đăng nhập lại
      const cookieOptions = { httpOnly: true };
    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', { ...cookieOptions, 
      // path: '/'
      path: '/api/v1/auth/refresh' });

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Phiên đăng nhập hết hạn.' });
    }
  }

  // logout
  async logout(req, res) {
    try {
      const cookieOptions = {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',      
        sameSite: 'strict' as const,
      }
        const refreshToken = req.cookies['refresh_token'];
        if (refreshToken) {
      try {
        const decoded = this.jwtService.verify(refreshToken);
        const clear:any=null;
        await this.usersService.updateRefreshToken(decoded.sub,clear);
      } catch {
      }
    }
      res.clearCookie('access_token',cookieOptions);
      res.clearCookie('refresh_token',{
        ...cookieOptions, 
        path: '/api/v1/auth/refresh'
        // path: '/'
      })
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Đăng xuất thành công. Hẹn gặp lại bạn!',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Có lỗi xảy ra khi đăng xuất',
      });
    }
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  };

  checkCode = async (data: CodeAuthDto) => {
    return await this.usersService.handleActive(data);
  };

  retryActive = async (email: string) => {
    return await this.usersService.retryActive(email);
  };

  retryPassword = async (email: string) => {
    return await this.usersService.retryPassword(email);
  };

  changePassword = async (data: changePasswordAuthDto) => {
    return await this.usersService.changePassword(data);
  };
  //google,github
  // async validateOAuthLogin(profile: any) {
  //   let user = await this.usersService.findByEmail(profile.email);

  //   if (!user) {
  //     user = await this.usersService.createGoogleUser(profile);
  //   }
  //   const payload = { username: user.email, sub: user._id };
  //   return {
  //     user: {
  //       email: user.email,
  //       _id: user._id,
  //       name: user.name,
  //       image: user.image,
  //     },
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

//   async validateOAuthLogin(profile: any, res: any) {
//   const accessExpire = process.env.JWT_ACCESS_EXPIRE || '15m';
//   const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '7d';
//   const accessCookieAge = parseInt(process.env.COOKIE_ACCESS_MAX_AGE as string, 10) || 900000;
//   const refreshCookieAge = parseInt(process.env.COOKIE_REFRESH_MAX_AGE as string, 10) || 604800000;
//   const isProd = process.env.NODE_ENV === 'production';

//   //  Dùng hàm chung cho cả Google lẫn GitHub
//   let user = await this.usersService.findByEmail(profile.email);
//   if (!user) {
//     user = await this.usersService.createOAuthUser(profile);
//   }

//   const payload = { username: user.email, sub: user._id };

//   const accessToken = this.jwtService.sign(payload, {
//     expiresIn: accessExpire as any,
//   });

//   // Có refresh token như login thường
//   const refreshToken = this.jwtService.sign(payload, {
//     expiresIn: refreshExpire as any,
//   });

//   await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);

//   const cookieBase = {
//     httpOnly: true,
//     secure: isProd,
//     sameSite: 'lax' as const,
//   };

//   //  Set cookie thay vì trả JSON
//   res.cookie('access_token', accessToken, {
//     ...cookieBase,
//     maxAge: accessCookieAge,
//   });

//   res.cookie('refresh_token', refreshToken, {
//     ...cookieBase,
//     path: '/',
//     maxAge: refreshCookieAge,
//   });
//   const userInfo = encodeURIComponent(JSON.stringify({
//     _id: user._id,
//     email: user.email,
//     name: user.name,
//     image: user.image,
//   }));

//   //  Redirect về trang chủ sau khi login OAuth thành công
//  const callbackUrl = profile.provider === 'github'
//     ? 'http://localhost:3000/auth/github/callback?user=${userInfo}'
//     : 'http://localhost:3000/auth/google/callback?user=${userInfo}';
//     return res.redirect(callbackUrl);
// }
//gogle+github
async validateOAuthLogin(profile: any, res: any) {
  const accessExpire = process.env.JWT_ACCESS_EXPIRE || '15m';
  const refreshExpire = process.env.JWT_REFRESH_EXPIRE || '7d';
  const accessCookieAge = parseInt(process.env.COOKIE_ACCESS_MAX_AGE as string, 10) || 900000;
  const refreshCookieAge = parseInt(process.env.COOKIE_REFRESH_MAX_AGE as string, 10) || 604800000;
  const isProd = process.env.NODE_ENV === 'production';

  const user = await this.usersService.createOAuthUser(profile);

  const payload = { username: user.email, sub: user._id };

  const accessToken = this.jwtService.sign(payload, {
    expiresIn: accessExpire as any,
  });
  const refreshToken = this.jwtService.sign(payload, {
    expiresIn: refreshExpire as any,
  });

  await this.usersService.updateRefreshToken(user._id.toString(), refreshToken);

  const cookieBase = {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax' as const,
  };

  res.cookie('access_token', accessToken, {
    ...cookieBase,
    maxAge: accessCookieAge,
  });

  res.cookie('refresh_token', refreshToken, {
    ...cookieBase,
    path: '/',
    maxAge: refreshCookieAge,
  });

  //  Truyền user info qua URL để frontend lấy
  const userInfo = encodeURIComponent(JSON.stringify({
    _id: user._id,
    email: user.email,
    name: user.name,
    image: user.image,
  }));
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

  const callbackUrl = profile.provider === 'github'
    ? `${frontendUrl}/auth/github/callback?user=${userInfo}`
    : `${frontendUrl}/auth/google/callback?user=${userInfo}`;

  return res.redirect(callbackUrl);
}
  
}
