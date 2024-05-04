require("dotenv").config();
const bcrypt = require("bcrypt");

const HASURA_ENDPOINT = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET;
const ADMIN_NAME = process.env.ADMIN_NAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const execute = async (query, variables = {}) => {
  const response = await fetch(HASURA_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Error executing query");
  }

  return data;
};

const seed = async () => {
  const CHECK_USER_EXISTS = `
    query CheckUserExists {
      users(where: {email: {_eq: "${ADMIN_EMAIL}"}}) {
        id
      }
    }
  `;
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const CREATE_ADMIN_USER = `
    mutation CreateAdminUser {
      insert_users_one(object: {name: "${ADMIN_NAME}", password: "${hashedPassword}", email: "${ADMIN_EMAIL}", role: "admin"}) {
        id
      }
    }
  `;

  try {
    const existingUser = await execute(CHECK_USER_EXISTS);
    if (existingUser.data.users.length > 0) {
      console.log(
        "Admin user already exists with ID:",
        existingUser.data.users[0].id
      );
    } else {
      const result = await execute(CREATE_ADMIN_USER);
      console.log(
        "Admin user created with ID:",
        result.data.insert_users_one.id
      );
    }
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

seed();
