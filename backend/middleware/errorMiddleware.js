const errorHandler = (statusCode, message) => {
  const error = new Error(message); // Pass message to the Error constructor
  error.statusCode = statusCode;

  return error;
}

module.exports = errorHandler; // Corrected the export statement
