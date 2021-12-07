import { testConnection } from "../test-utils/db";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import { graphqlCall } from "../test-utils/graphql-call";
import { createAccessToken } from "../utils/token";
import { Task } from "../entity/Task";
import { name, internet } from "faker";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

const TASKS_QUERY = `
    query {
        tasks {
            taskId
            taskName
            isCompleted
            isImportant 
        }
    }
`;

const ADD_TASK_MUTATION = `
    mutation AddTask($task: AddTaskInput!) {
        addTask(task: $task) {
            taskId
            taskName
            isCompleted
            isImportant 
        } 
    }
`;

const UPDATE_TASK_MUTATION = `
    mutation UpdateTask($task: UpdateTaskInput!) {
        updateTask(task: $task) {
            taskId
            taskName
            isCompleted
            isImportant 
        }
    }

`;

describe("Task Resolver", () => {
  it("tasks", async () => {
    const user = await User.create({
      username: name.firstName(),
      email: internet.email(),
      password: "fadkjr345894joimdfDAFwer#$234",
    }).save();
    const response = await graphqlCall({
      source: TASKS_QUERY,
      token: createAccessToken(user),
    });
    expect(response).toMatchObject({
      data: {
        tasks: [],
      },
    });
  });

  it("add task", async () => {
    const user = await User.create({
      username: name.firstName(),
      email: internet.email(),
      password: "#$@#ADSFAdkfjadsf324923084",
    }).save();
    const response = await graphqlCall({
      source: ADD_TASK_MUTATION,
      variableValues: {
        task: {
          taskName: "do homework",
        },
      },
      token: createAccessToken(user),
    });
    const tasks = await Task.find({});

    expect(response).toMatchObject({
      data: {
        addTask: {
          taskId: "1",
          taskName: "do homework",
          isCompleted: false,
          isImportant: false,
        },
      },
    });
    expect(tasks.length).toBe(1);
  });

  it("update task", async () => {
    const user = await User.create({
      username: name.firstName(),
      email: internet.email(),
      password: "42#$@#DFadjk39r3jASDFADsf",
    }).save();
    const response = await graphqlCall({
      source: UPDATE_TASK_MUTATION,
      variableValues: {
        task: {
          taskId: 1,
          taskName: "feed the chicken",
          isImportant: true,
        },
      },
      token: createAccessToken(user),
    });
    const tasks = await Task.find({});
    expect(response).toMatchObject({
      data: {
        updateTask: {
          taskId: "1",
          taskName: "feed the chicken",
          isCompleted: false,
          isImportant: true,
        },
      },
    });
    expect(tasks.length).toBe(1);
  });
});
