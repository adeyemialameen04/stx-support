export class AuthenticationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "CONFLICT_ERROR";
  }
}

export class InvariantError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "INVARIANT_ERROR";
  }
}

export class AuthorizationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "AUTHORIZATION_ERROR";
  }
}
export class NotFoundError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "NOT_FOUND";
  }
}

export class InternalServerError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "INTERNAL_SERVER_ERRROR";
  }
}
