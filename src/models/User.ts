import axios, { AxiosResponse } from 'axios';

import { Eventing } from './Eventing';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();

  constructor(private data: UserProps) {}

  get(prop: string): string | number {
    return this.data[prop];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
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
