import {
  adminActionTypes, teacherActionTypes, studentActionTypes, loaderActionTypes, eventActionTypes,
} from './actions';
import { guidGenerator } from '../../../utility/helpers/guid';

const initialState = {
  admins: { array: [], totalCount: 0 },
  teachers: { array: [], totalCount: 0 },
  students: { array: [], totalCount: 0 },
  user: {},
  loads: [],
  events: [],
};


function adminReducer(state, { type, payload }) {
  let resolved = true;
  let newState = state;
  switch (type) {
    case adminActionTypes.GET_ALL_COMPLETED:
      newState = {
        ...state,
        admins: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };
      break;
    case adminActionTypes.GET_COMPLETED:
    case adminActionTypes.ADD_COMPLETED:
    case adminActionTypes.EDIT_COMPLETED:
    case adminActionTypes.OBSOLETE_COMPLETED:
    case adminActionTypes.RESTORE_COMPLETED:
      newState = {
        ...state,
        user: payload,
      };
      break;

    case adminActionTypes.GET_MORE_COMPLETED:
      newState = {
        ...state,
        admins: {
          totalCount: payload.totalCount,
          array: [
            ...state.admins.array,
            //   .filter(a => !(payload.array || []).some(p => p.id === a.id)),
            ...(payload.array || [])],
        },
      };
      break;

    case adminActionTypes.GET_ALL_FAILED:
    case adminActionTypes.GET_FAILED:
    case adminActionTypes.ADD_FAILED:
    case adminActionTypes.EDIT_FAILED:
    case adminActionTypes.OBSOLETE_FAILED:
    case adminActionTypes.RESTORE_FAILED:
    case adminActionTypes.GET_MORE_FAILED:
      break;
    default:
      resolved = false;
      return state;
  }

  return { resolved, state: newState };
}

function studentReducer(state, { type, payload }) {
  let resolved = true;
  let newState = state;

  switch (type) {
    case studentActionTypes.GET_ALL_COMPLETED:
      newState = {
        ...state,
        students: { array: payload.array || [], totalCount: payload.totalCount || 0 },
      };
      break;

    case studentActionTypes.GET_COMPLETED:
    case studentActionTypes.ADD_COMPLETED:
    case studentActionTypes.EDIT_COMPLETED:
    case studentActionTypes.OBSOLETE_COMPLETED:
    case studentActionTypes.RESTORE_COMPLETED:
      newState = {
        ...state,
        user: payload,
      };
      break;
    case studentActionTypes.GET_MORE_COMPLETED:
      newState = {
        ...state,
        students: {
          totalCount: payload.totalCount,
          array: [
            ...state.students.array,
            //   .filter(s => !(payload.array || []).some(p => p.id === s.id)),
            ...(payload.array || [])],
        },
      };
      break;

    case studentActionTypes.GET_FAILED:
    case studentActionTypes.GET_ALL_FAILED:
    case studentActionTypes.ADD_FAILED:
    case studentActionTypes.EDIT_FAILED:
    case studentActionTypes.OBSOLETE_FAILED:
    case studentActionTypes.RESTORE_FAILED:
    case studentActionTypes.GET_MORE_FAILED:
      break;
    default:
      resolved = false;
      break;
  }
  return { resolved, state: newState };
}

function teacherReducer(state, { type, payload }) {
  let resolved = true;
  let newState = state;

  switch (type) {
    case teacherActionTypes.GET_ALL_COMPLETED:
      newState = {
        ...state,
        teachers: { array: payload.array || [], totalCount: payload.totalCount || 0 },

      };
      break;

    case teacherActionTypes.ADD_COMPLETED:
    case teacherActionTypes.GET_COMPLETED:
    case teacherActionTypes.EDIT_COMPLETED:
    case teacherActionTypes.OBSOLETE_COMPLETED:
    case teacherActionTypes.RESTORE_COMPLETED:
      newState = {
        ...state,
        user: payload,
      };
      break;

    case teacherActionTypes.GET_MORE_COMPLETED:
      newState = {
        ...state,
        teachers: {
          totalCount: payload.totalCount,
          array: [
            ...state.teachers.array,
            //   .filter(t => !(payload.array || []).some(p => p.id === t.id)),
            ...(payload.array || [])],
        },
      };
      break;

    case teacherActionTypes.GET_FAILED:
    case teacherActionTypes.GET_ALL_FAILED:
    case teacherActionTypes.GET_MORE_FAILED:
    case teacherActionTypes.ADD_FAILED:
    case teacherActionTypes.EDIT_FAILED:
    case teacherActionTypes.OBSOLETE_FAILED:
    case teacherActionTypes.RESTORE_FAILED:
      break;

    default:
      resolved = false;
      return state;
  }
  return { resolved, state: newState };
}

function loaderReducer(state, { type, payload }) {
  let resolved = true;
  let newState = state;

  switch (type) {
    case loaderActionTypes.LOADER_REGISTER:
      newState = {
        ...state,
        loads: [payload, ...state.loads],
      };
      break;

    case loaderActionTypes.LOADER_RESOLVE:
      newState = {
        ...state,
        loads: state.loads.filter(l => l !== payload) || [],
      };
      break;

    default:
      resolved = false;
      break;
  }

  return { resolved, state: newState };
}

function eventReducer(state, { type, payload }) {
  let resolved = true;
  let newState = state;

  switch (type) {
    case eventActionTypes.USERS_EVENT_HANDLED:
      newState = {
        ...state,
        events: state.events.filter(e => e.id !== payload),
      };
      break;

    case eventActionTypes.USERS_EVENT_OCCURED:
      newState = {
        ...state,
        events: [
          {
            ...payload,
            id: guidGenerator(),
          },
          ...state.events],
      };
      break;

    default:
      resolved = false;
      break;
  }

  return { resolved, state: newState };
}

export default function reducer(state = initialState, action) {
  const admin = adminReducer(state, action);
  if (admin.resolved) {
    return admin.state;
  }

  const student = studentReducer(state, action);
  if (student.resolved) {
    return student.state;
  }

  const teacher = teacherReducer(state, action);
  if (teacher.resolved) {
    return teacher.state;
  }

  const loader = loaderReducer(state, action);
  if (loader.resolved) {
    return loader.state;
  }

  const event = eventReducer(state, action);
  if (event.resolved) {
    return event.state;
  }

  return state;
}
