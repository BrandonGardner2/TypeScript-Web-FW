import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';
import { User, UserProps } from "./User";

export class Collection {
  models: User[] = [];
  events: Eventing = new Eventing();

  constructor(private rootUrl: string) {};

  on = this.events.on;
  trigger = this.events.trigger;

  fetch(): void {
    axios.get(this.rootUrl)
      .then((res: AxiosResponse) => {
        this.models = res.data.map((user: UserProps): User => User.buildUser(user));
        this.trigger('change');
      })
      .catch((err: Error) => console.log(err));
  }
}