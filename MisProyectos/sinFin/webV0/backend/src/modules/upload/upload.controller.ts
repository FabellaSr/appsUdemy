import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('collection/:collectionId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCollectionImage(
    @CurrentUser('userId') userId: string,
    @Param('collectionId') collectionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadCollectionImage(userId, collectionId, file);
  }

  @Post('profile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImage(
    @CurrentUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadProfileImage(userId, file);
  }

  @Post('proof')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPaymentProof(
    @CurrentUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadPaymentProof(userId, file);
  }

  @Post('presigned')
  async getPresignedUrl(
    @Body() body: { filename: string; mimeType: string },
  ) {
    return this.uploadService.getPresignedUrl(body.filename, body.mimeType);
  }
}
