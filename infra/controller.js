import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObject);

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

export const errorHandlers = {
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
};
