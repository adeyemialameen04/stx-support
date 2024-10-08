export class AuthenticationError extends Error {
  constructor(public message: string) {
    super(message);
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
