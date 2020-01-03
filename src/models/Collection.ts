import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(
    private rootUrl: string,
    public deserialize: (json: K) => T
    ) {};

  on = this.events.on;
  trigger = this.events.trigger;

  fetch(): void {
    axios.get(this.rootUrl)
      .then((res: AxiosResponse) => {
        this.models = res.data.map((val: K): T => this.deserialize(val));
        this.trigger('change');
      })
      .catch((err: Error) => console.log(err));
  }
}