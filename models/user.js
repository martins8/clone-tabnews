import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors";

const UNIQUE_EMAIL_ERROR = {
  message: "O email informado já está sendo utilizado.",
  action: "Utilize outro email para realizar o cadastro.",
};

const UNIQUE_USERNAME_ERROR = {
  message: "O nome de usuário informado já está sendo utilizado.",
  action: "Utilize outro nome de usuário para realizar o cadastro.",
};

const USER_NOT_FOUND_ERROR = {
  message: "O username informado não foi encontrado no sistema.",
  action: "Verifique se o username está digitado corretamente.",
};

async function create(userInputValue) {
  const newUser = await runInsertQuery(userInputValue);
  return newUser;
}

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username);
  return userFound;
}

async function runSelectQuery(username) {
  const result = await database.query({
    text: "SELECT * FROM users WHERE LOWER(username) = LOWER($1) LIMIT 1",
    values: [username],
  });
  if (result.rowCount === 0) {
    throw new NotFoundError(USER_NOT_FOUND_ERROR);
  }
  return result.rows[0];
}

async function runInsertQuery(userInputValue) {
  const { email, username } = userInputValue;
  await validateUniqueEmail(email);
  await validateUniqueUsername(username);

  const result = await database.query({
    text: `
    INSERT INTO
      users (username, email, password)
    VALUES
      ($1, $2, $3)
    RETURNING *`,
    values: [
      userInputValue.username,
      userInputValue.email,
      userInputValue.password,
    ],
  });
  return result.rows[0];
}

async function validateUniqueEmail(email) {
  const result = await database.query({
    text: `SELECT email FROM users WHERE LOWER(email) = LOWER($1)`,
    values: [email],
  });
  checkResultRows(result, UNIQUE_EMAIL_ERROR);
}

async function validateUniqueUsername(username) {
  const result = await database.query({
    text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1)",
    values: [username],
  });
  checkResultRows(result, UNIQUE_USERNAME_ERROR);
}

function checkResultRows(result, errorObject) {
  if (result.rowCount > 0) {
    throw new ValidationError(errorObject);
  }
}
const user = {
  create,
  findOneByUsername,
};

export default user;
