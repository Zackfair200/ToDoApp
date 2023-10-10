import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.allTasks();
  }

  @Get(':id')
  async getOneTask(@Param('id') id: string) {
    const taskFound = await this.tasksService.findTaskById(id);
    if (!taskFound) throw new NotFoundException('Task not found');
    return taskFound;
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    try {
      return await this.tasksService.createTask(body);
    } catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Task already exists');
      } else {
        throw error;
      }
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.deleteTaskById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const task = await this.tasksService.updateTaskById(id, body);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
}
