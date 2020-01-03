import { APISync } from './APISync';
import { Eventing } from './Eventing';
import { Attributes } from './Attributes';
import { Model } from './Model';

export interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const rootUrl = 'http://localhost:3000';

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(rootUrl)
    );
  }

  isAdminUser(): boolean {
    return this.get('id') === 1;
  }
}
