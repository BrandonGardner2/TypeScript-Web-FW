import { EventMap } from './UserForm';
import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
  regions: { [key: string]: Element } = {};

  constructor (public parent: Element, public model: T) {
    this.bindModel();
  };

  abstract template(): string;

  eventsMap(): EventMap {
    return {};
  }

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

  regionMap(): { [key: string]: string } {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionMap = this.regionMap();

    for (let key in regionMap) {
      const selector = regionMap[key];
      const element = fragment.querySelector(selector);
      if (element) {
        this.regions[key] = element;
      }
    }
  }

  onRender(): void {};

  render() {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.append(templateElement.content);
  }
}
