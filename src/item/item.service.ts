import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) { }

  async create(dto: CreateItemDto): Promise<Item> {
    const item = this.itemRepo.create(dto);
    return this.itemRepo.save(item);
  }

  async findAll(query: any): Promise<Item[]> {
    const { search, sortBy = 'id', sortOrder = 'ASC' } = query;
    const where = search ? [{ name: Like(`%${search}%`) }] : {};
    const result = await this.itemRepo.find({
      where,
      order: { [sortBy]: sortOrder.toUpperCase() },
    });
    return result.map((item) => ({
      ...item,
      imageUrl: item.image ? `/uploads/images/${item.image}` : null,
    }));
  }

  async findOne(id: number): Promise<Item & { imageUrl: string | null }> {
    const result = await this.itemRepo.findOne({
      where: { id },
    });
    if (!result) {
      throw new Error('Item not found');
    }
    return {
      ...result,
      imageUrl: result.image ? `/uploads/images/${result.image}` : null,
    };
  }

  async update(id: number, dto: UpdateItemDto): Promise<Item> {
    await this.itemRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepo.softDelete(id);
  }

  async updateFile(id: number, fileInfo: Partial<Item>): Promise<Item> {
    const item = await this.itemRepo.findOneBy({ id });

    if (!item) {
      throw new Error('Item not found');
    }

    if (fileInfo.image && item.image) {
      const oldImagePath = path.join(__dirname, '..', '..', 'uploads', 'images', item.image);
      if (fs.existsSync(oldImagePath)) {
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.error('Error deleting old image:', error);
        }
      }
    }
    await this.itemRepo.update(id, fileInfo);
    return this.findOne(id);
  }
}