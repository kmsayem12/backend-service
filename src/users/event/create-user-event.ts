export interface CreateUserEventData {
  name: string;
  email: string;
  password: string;
}

export class CreateUserEvent {
  constructor(public readonly data: CreateUserEventData) {}
}
