import { User } from './../models/User';

interface EventMap {
  [key: string]: () => void
}

export class UserForm {
  constructor (public parent: Element, public model: User) {};

  eventsMap(): EventMap {
    return {
      'click:button': this.onButtonClick 
    };
  }

  onButtonClick(): void {
    console.log('Click');
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <div>User Name: ${this.model.get('name')}</div>
        <div>User Age: ${this.model.get('age')}</div>
        <input />
        <button>Click Me</button>
      </div>
    `;
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');

      const elems = fragment.querySelectorAll(selector);
      elems.forEach((elem: Element): void => {
        elem.addEventListener(eventName, eventsMap[eventName]);
      })
    }
  }

  render() {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}