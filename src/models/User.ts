type Callback = () => void;

export interface UserProps {
  name: string;
  age: number;
}

export interface UserUpdateProps {
  name?: string;
  age?: number;
}

export interface Events {
  [key: string]: Callback[]
}


export class User {
  events: Events = {};

  constructor(private data: UserProps) {}

  get(prop: string): string | number {
    return this.data[prop];
  }

  set(update: UserUpdateProps): void {
    Object.assign(this.data, update);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((cb: Callback) => cb());
  }
}
