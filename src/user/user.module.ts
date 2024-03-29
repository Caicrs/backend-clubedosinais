import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module'; // < NOVO IMPORT
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from 'src/casl/casl.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { MailModule } from 'src/mails/mail.module';
import { RecoveryPasswordByEmail } from './services/update-my-password.service';
import { UpdatePasswordByEmailService } from './services/recovery-pasword-by-email.service';
@Module({
  imports: [
    PrismaModule,
    CaslModule,
    MailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    JwtStrategy,
    RecoveryPasswordByEmail,
    UpdatePasswordByEmailService,
  ],
})
export class UserModule {}
