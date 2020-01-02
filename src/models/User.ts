import axios, { AxiosResponse } from 'axios';

type Callback = () => void;

export interface UserProps {
  id?: number;
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

  set(update: UserProps): void {
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

  fetch(): void {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      })
      .catch((err: Error) => console.log(err))
  }

  save(): void {
    const id = this.get('id');
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data)
        .then((res: AxiosResponse): void => {
          this.set(res.data);
        })
        .catch((err: Error) => console.log(err));
    } else {
      axios.post(`http://localhost:3000/users`, this.data)
      .then((res: AxiosResponse): void => {
        this.set(res.data);
      })
      .catch((err: Error) => console.log(err));
    }
  }
}
