import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>
    ){}

    async allTasks(){
        return this.taskModel.find();
    }

    async createTask(taskToCreate: CreateTaskDto){
        const newTask = new this.taskModel(taskToCreate);
        await newTask.save();
        return newTask;
    }

    async findTaskById(id: string){
        return this.taskModel.findById(id);
    }

    async deleteTaskById(id: string){
        return this.taskModel.findByIdAndDelete(id);
    }

    async updateTaskById(id: string, task: UpdateTaskDto){
        return this.taskModel.findByIdAndUpdate(id, task, { new: true});
    }
}
