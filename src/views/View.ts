import { EventMap } from './UserForm';
import { Callback } from './../models/Eventing';

interface Renderable {
  on(eventName: string, callback: Callback): void;
}

export abstract class View<T extends Renderable> {
  constructor (public parent: Element, public model: T) {
    this.bindModel();
  };

  abstract eventsMap(): EventMap;
  abstract template(): string;

  bindModel(): void {
    this.model.on('change', this.render);
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
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
