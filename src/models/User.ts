import { Attributes } from './Attributes';
import { Sync } from './Sync';
import { Eventing } from './Eventing';
import { AxiosResponse } from 'axios';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(`https://localhost:3000`);
  public attributes: Attributes<UserProps>;
  
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  };

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.events.trigger('change');
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
}
