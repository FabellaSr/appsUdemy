import {
  Controller, Post, UploadedFile, UseGuards, UseInterceptors, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { Roles } from '../common/roles.decorator';
import { Role } from '../common/roles.enum';

const UPLOADS_DIR = process.env.UPLOADS_DIR ?? '/app/uploads';
const ALLOWED = ['.jpg', '.jpeg', '.png', '.webp'];

@Controller('uploads')
export class UploadsController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.PROVIDER, Role.ADMIN)
  @Post('work-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: UPLOADS_DIR,
      filename: (_req, file, cb) => {
        const ext = extname(file.originalname).toLowerCase();
        const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, name);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (_req, file, cb) => {
      const ext = extname(file.originalname).toLowerCase();
      if (!ALLOWED.includes(ext)) return cb(new BadRequestException('Invalid file type'), false);
      cb(null, true);
    },
  }))
  uploadWorkPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file');
    return { url: `/api/static/${file.filename}`, filename: file.filename };
  }
}
