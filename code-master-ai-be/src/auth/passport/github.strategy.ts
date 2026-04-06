import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private configService: ConfigService) {
    super({
      clientID:configService.get<string>('GITHUB_CLIENT_ID')!, 
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET')!, 
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL')!,
      scope: ['user:email'], 
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
    // Rút trích thông tin từ GitHub trả về
    const { id, username, displayName, photos, emails } = profile;
    const user = {
      githubId: id,
      name: displayName || username,
      email: emails && emails.length > 0 ? emails[0].value : null,
      image: photos && photos.length > 0 ? photos[0].value : null,
      provider: 'github',
    };
    done(null, user);
  }
}