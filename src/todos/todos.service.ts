import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodosService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTodoDto: CreateTodoDto) {
    return this.databaseService.todo.create({
      data: createTodoDto,
    });
  }

  findAll() {
    return this.databaseService.todo.findMany();
  }

  findOne(id: number) {
    return this.databaseService.todo.findMany({ where: { id } });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      return await this.databaseService.todo.update({
        where: {
          id,
        },
        data: updateTodoDto,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.todo.delete({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
