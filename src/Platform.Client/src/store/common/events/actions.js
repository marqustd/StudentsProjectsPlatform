export const eventsActionTypes = {
  EVENT_REGISTERED: 'event/EVENT_REGISTERED',
  EVENT_HANDLED: 'event/EVENT_HANDLED',
  EVENT_REGISTER_REQUEST: 'event/EVENT_REGISTER_REQUEST',
  EVENT_HANDLE_REQUEST: 'event/EVENT_HANDLE_REQUEST',
};

export function registerEvent(event) {
  return {
    type: eventsActionTypes.EVENT_REGISTER_REQUEST,
    payload: event,
  };
}

export function handleEvent(eventId) {
  return {
    type: eventsActionTypes.EVENT_HANDLE_REQUEST,
    payload: eventId,
  };
}

export function eventRegistered(event) {
  return {
    type: eventsActionTypes.EVENT_REGISTERED,
    payload: event,
  };
}

export function eventHandled(eventId) {
  return {
    type: eventsActionTypes.EVENT_HANDLED,
    payload: eventId,
  };
}
