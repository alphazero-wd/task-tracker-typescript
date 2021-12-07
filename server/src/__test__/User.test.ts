import { testConnection } from "../test-utils/db";
import { Connection } from "typeorm";
import { name, internet } from "faker";
import { graphqlCall } from "../test-utils/graphql-call";
import { User } from "../entity/User";
import { createAccessToken } from "../utils/token";

let connection: Connection;

beforeAll(async () => {
  connection = await testConnection();
});

afterAll(async () => {
  await connection.close();
});

const SIGNUP_MUTATION = `
  mutation Signup($user: SignupInput!) {
    signup(user: $user) {
      user {
        username
        email
      }
      error {
        field
        message
      }
    }
  }
`;

const LOGIN_MUTATION = `
  mutation Login($user: LoginInput!) {
    login(user: $user) {
      user {
        userId
        username
        email
      }
      error { 
        field
        message
      }
    }
  }
`;

const ME_QUERY = `
  query {
    me {
      userId
      username
      email
    }
  }

`;

describe("user resolver testing", () => {
  it("sign up", async () => {
    const user = {
      username: "ben",
      email: "ben@ben.com",
      password: "324890jfiqnm3k45j23ml3rASDFAR#4",
      confirmPassword: "324890jfiqnm3k45j23ml3rASDFAR#4",
    };
    const response = await graphqlCall({
      source: SIGNUP_MUTATION,
      variableValues: {
        user,
      },
    });
    expect(response).toMatchObject({
      data: {
        signup: {
          user: {
            username: user.username,
            email: user.email,
          },
        },
        error: null,
      },
    });
  });

  it("login", async () => {
    const user = await User.create({
      username: name.firstName(),
      email: internet.email(),
      password: "adfAr34948234jfka#@$3423",
    }).save();

    const response = await graphqlCall({
      source: LOGIN_MUTATION,
      variableValues: {
        user: {
          usernameOrEmail: user.username,
          password: "adfAr34948234jfka#@$3423",
        },
      },
    });

    expect(response).toMatchObject({
      data: {
        login: {
          user: {
            userId: user.userId.toString(),
            username: user.username,
            email: user.email,
          },
          error: null,
        },
      },
    });
  });

  it("me", async () => {
    const user = await User.create({
      username: name.firstName(),
      email: internet.email(),
      password: "adsF#$23489jqdfadFAFAsdfasdf",
    }).save();
    const response = await graphqlCall({
      source: ME_QUERY,
      token: createAccessToken(user),
    });
    expect(response).toMatchObject({
      data: {
        me: {
          userId: user.userId.toString(),
          username: user.username,
          email: user.email,
        },
      },
    });
  });
});
