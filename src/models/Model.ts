import { AxiosPromise } from 'axios';
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

export class Model {

}