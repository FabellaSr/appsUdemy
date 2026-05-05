import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateCollectionDto, UpdateCollectionDto, ReorderImagesDto } from './dto/collection.dto';

@Controller('collections')
@UseGuards(JwtAuthGuard)
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll(@CurrentUser('userId') userId: string) {
    return this.collectionsService.findAllByUser(userId);
  }

  @Get(':id')
  async findOne(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.findOne(userId, collectionId);
  }

  @Post()
  async create(
    @CurrentUser('userId') userId: string,
    @Body() createDto: CreateCollectionDto,
  ) {
    return this.collectionsService.create(userId, createDto);
  }

  @Put(':id')
  async update(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
    @Body() updateDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(userId, collectionId, updateDto);
  }

  @Delete(':id')
  async delete(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.delete(userId, collectionId);
  }

  @Post(':id/request-publication')
  async requestPublication(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.requestPublication(userId, collectionId);
  }

  @Post(':id/publish')
  async publish(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.publish(userId, collectionId);
  }

  @Post(':id/hide')
  async hide(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
  ) {
    return this.collectionsService.hide(userId, collectionId);
  }

  @Delete(':id/images/:imageId')
  async removeImage(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.collectionsService.removeImage(userId, collectionId, imageId);
  }

  @Put(':id/images/reorder')
  async reorderImages(
    @CurrentUser('userId') userId: string,
    @Param('id') collectionId: string,
    @Body() reorderDto: ReorderImagesDto,
  ) {
    return this.collectionsService.reorderImages(userId, collectionId, reorderDto);
  }
}
