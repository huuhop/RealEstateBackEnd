import { Controller, Post, UploadedFile, UseInterceptors, Param, Patch } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ItemService } from 'src/item/item.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly itemService: ItemService,
  ) {}

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file', new UploadService().getMulterOptions('uploads/images')))
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.itemService.updateFile(+id, { image: file.filename });
  }

  @Post(':id/document')
  @UseInterceptors(FileInterceptor('file', new UploadService().getMulterOptions('uploads/docs')))
  async uploadDoc(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.itemService.updateFile(+id, { document: file.filename });
  }
}