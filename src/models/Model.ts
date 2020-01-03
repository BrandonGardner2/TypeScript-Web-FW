import { AxiosPromise, AxiosResponse } from 'axios';
import { Callback } from './Eventing';

export interface ModelAttributes<T> {
  set(update: T): void;
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
}

export interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

export interface Events {
  events: {
    [key: string]: Callback[]
  };
  on(eventName: string, callback: Callback);
  trigger(eventName: string);
}

interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {};

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  get data(): T {
    return this.attributes.getAll();
  }

  set(update: T): void {
    this.attributes.set(update);
    this.trigger('change');
  }

  fetch(): void {
    const id = this.get('id');

    if (typeof id !== 'number') {
      throw new Error('Cannot fetch without an id.');
    }

    this.sync.fetch(id)
      .then((res: AxiosResponse): void => {
        const { data } = res;
        this.set(data);
      })
      .catch((err: Error) => console.log(err));
  }

  save(): void {
    const attrs = this.attributes.getAll();

    this.sync.save(attrs)
      .then((res: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch((err: Error) => console.log(err));
  }
}