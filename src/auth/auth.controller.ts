import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join, resolve } from 'path';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registration(@Body() userData: CreateUserDto) {
    return this.authService.registration(userData);
  }

  @Post('login')
  login(@Body() userData: AuthUserDto) {
    return this.authService.validateUser(userData);
  }

  @Post('store/registration')
  @UseInterceptors(
    FilesInterceptor('image', 6, {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads/shop-image'),
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  storeRegistration(
    @Body() storeData: any,
    @UploadedFiles() image: Array<Express.Multer.File>,
  ) {
    return this.authService.storeRegistration({
      ...storeData,
      files: image,
    });
  }
}
