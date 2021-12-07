import { MyContext } from '../types/MyContext';
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Task } from '../entity/Task';
import { isAuth } from '../middlewares/isAuth';
import { AddTaskInput, UpdateTaskInput } from '../types/Task';

@Resolver()
export class TaskResolver {
  @UseMiddleware(isAuth)
  @Query(() => [Task])
  async tasks(@Ctx() { req }: MyContext): Promise<Task[]> {
    const tasks = await Task.find({ where: { userId: req.payload?.userId } });
    return tasks;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Task)
  async addTask(
    @Arg('task') { taskName, isCompleted, isImportant }: AddTaskInput,
    @Ctx() { req }: MyContext
  ): Promise<Task> {
    if (!taskName) {
      throw new Error('Task name cannot be empty.');
    }
    const newTask = await Task.create({
      taskName,
      isCompleted,
      isImportant,
      userId: req.payload?.userId,
    }).save();
    return newTask;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Task)
  async updateTask(@Arg('task') task: UpdateTaskInput): Promise<Task | null> {
    const dbTask = await Task.findOne(task.taskId);
    if (!dbTask) {
      return null;
    }

    await Task.merge(dbTask, task).save();

    return dbTask;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean!)
  async deleteTask(@Arg('taskId') taskId: number): Promise<boolean> {
    const task = await Task.findOne(taskId);
    if (!task) return false;

    await Task.delete(taskId);
    return true;
  }
}
