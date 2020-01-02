export interface UserProps {
  name: string;
  age: number;
}

export interface UserUpdateProps {
  name?: string;
  age?: number;
}

export class User {
  constructor(private data: UserProps) {}

  get(prop: string): string | number {
    return this.data[prop];
  }

  set(update: UserUpdateProps): void {
    Object.assign(this.data, update);
  }
}
