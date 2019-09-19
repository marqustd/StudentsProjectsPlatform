import { guidGenerator } from '../helpers/guid';

export class EventMiddleware {
  constructor(prefix) {
    this._prefix = prefix;
    this._guid = guidGenerator();
  }

  get eventActionTypes() {
    return {
      EVENT_ADD_REQUEST: `${this._prefix}/EVENT_ADD_REQUEST_${this._guid}`,
      EVENT_ADD_COMPLETED: `${this._prefix}/EVENT_ADD_COMPLETED_${this._guid}`,
      EVENT_REMOVE_REQUEST: `${this._prefix}/EVENT_REMOVE_REQUEST_${this._guid}`,
      EVENT_REMOVE_COMPLETED: `${this._prefix}/EVENT_REMOVE_COMPLETED_${this._guid}`,
    };
  }

  get actions() {
    return {
      eventAddRequest: event => ({
        type: this.eventActionTypes.EVENT_ADD_REQUEST,
        payload: event,
      }),

      eventAddCompleted: event => ({
        type: this.eventActionTypes.EVENT_ADD_COMPLETED,
        payload: event,
      }),

      eventRemoveRequest: id => ({
        type: this.eventActionTypes.EVENT_REMOVE_REQUEST,
        payload: id,
      }),

      eventRemoveCompleted: id => ({
        type: this.eventActionTypes.EVENT_REMOVE_COMPLETED,
        payload: id,
      }),
    };
  }
}


export class LoaderMiddleware {
  constructor(prefix) {
    this._prefix = prefix;
    this._guid = guidGenerator();
  }

  get actionTypes() {
    return {
      ADD_LOADER: `${this._prefix}/LOADER_REGISTER_${this._guid}`,
      REMOVE_LOADER: `${this._prefix}/LOADER_RESOLVE_${this._guid}`,
    };
  }

  get actions() {
    return {
      addLoader: loader => ({
        type: this.actionTypes.ADD_LOADER,
        payload: loader,
      }),
      removeLoader: loader => ({
        type: this.actionTypes.REMOVE_LOADER,
        payload: loader,
      }),
    };
  }
}
