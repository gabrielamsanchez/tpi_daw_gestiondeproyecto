import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from '../dtos/input/login.dtos';
import { AuthServiceService } from '../auth-service/auth-service.service';

@Controller('auth')
export class AuthControllerController {
  constructor(private readonly authService: AuthServiceService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(dto);
  }
}
