export function eventHandler(events, eventCode, handler, func) {
  const event = events.find(e => e.code === eventCode);
  if (event) {
    func();
    handler(event.id);
  }
}

export function loaderHandler(loaders, loader, isLoadingGetter, isLoadingSetter) {
  const elem = loaders.find(l => l === loader);
  if (elem) {
    if (!isLoadingGetter) {
      isLoadingSetter(true);
    }
  } else if (isLoadingGetter) {
    setTimeout(isLoadingSetter, 500, false);
  }
}

export const commonTableHandlers = {
  checkForRefresh: (refresh, setRefresh) => () => {
    if (refresh) {
      setRefresh(false);
      return true;
    }
    return false;
  },
};

export const temporaryDataHandlers = {
  getData: (containers, id, setter, filter, callback) => {
    if (containers[id] !== null && containers[id] !== undefined) {
      if (setter) {
        if (filter) {
          setter(filter(containers[id]));
        } else {
          setter(containers[id]);
        }
      }
      if (callback) {
        if (filter) {
          callback(filter(containers[id]));
        } else {
          callback(containers[id]);
        }
      }
    }
  },

  dispose: (id, containerHandler) => {
    containerHandler(id);
  },
};
