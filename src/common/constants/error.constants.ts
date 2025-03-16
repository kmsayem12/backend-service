export const ErrorMessages = {
  COMMON: {
    VALIDATION_FAILED: 'Validation failed',
  },
  GENERIC: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_IMPLEMENTED: 'Not implemented',
  },
  USER: {
    CREATE_FAILED: 'Failed to create user',
    FETCH_FAILED: 'Failed to fetch user',
    NOT_FOUND: (id: string) => `User with id ${id} not found`,
    VALIDATION_FAILED: 'Validation failed',
  },
  PRODUCT: {
    CREATE_FAILED: 'Failed to create product',
  },
  MICROSERVICE: {
    CONNECTION_FAILED: 'Microservice connection failed',
  },
};
