import { LoaderMiddleware } from '../../../utility/events/logicFactory';

export const studentsActionTypes = {
  GET_ALL_REQUEST: 'students/GET_ALL_REQUEST',
  GET_ALL_COMPLETED: 'students/GET_ALL_COMPLETED',
  GET_ALL_FAILED: 'students/GET_ALL_FAILED',

  GET_MORE_REQUEST: 'students/GET_MORE_REQUEST',
  GET_MORE_COMPLETED: 'students/GET_MORE_COMPLETED',
  GET_MORE_FAILED: 'students/GET_MORE_FAILED',

  ADD_REQUEST: 'students/ADD_REQUEST',
  ADD_COMPLETED: 'students/ADD_COMPLETED',
  ADD_FAILED: 'students/ADD_FAILED',

  REMOVE_REQUEST: 'students/REMOVE_REQUEST',
  REMOVE_COMPLETED: 'students/REMOVE_COMPLETED',
  REMOVE_FAILED: 'students/REMOVE_FAILED',

  GRADE_REQUEST: 'students/GRADE_REQUEST',
  GRADE_COMPLETED: 'students/GRADE_COMPLETED',
  GRADE_FAILED: 'students/GRADE_FAILED',

  GRADE_ALL_REQUEST: 'students/GRADE_ALL_REQUEST',
  GRADE_ALL_COMPLETED: 'students/GRADE_ALL_COMPLETED',
  GRADE_ALL_FAILED: 'students/GRADE_ALL_FAILED',
};
export function getAllRequest(subjectId, sectionId, index, count) {
  return {
    type: studentsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, sectionId, index, count,
    },
  };
}

export function getAllCompleted(studentsState) {
  return {
    type: studentsActionTypes.GET_ALL_COMPLETED,
    payload: studentsState,
  };
}

export function getAllFailed(error) {
  return {
    type: studentsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}

export function getMoreRequest(subjectId, sectionId, index, count) {
  return {
    type: studentsActionTypes.GET_ALL_REQUEST,
    payload: {
      subjectId, sectionId, index, count,
    },
  };
}

export function getMoreCompleted(studentsState) {
  return {
    type: studentsActionTypes.GET_ALL_COMPLETED,
    payload: studentsState,
  };
}

export function getMoreFailed(error) {
  return {
    type: studentsActionTypes.GET_ALL_FAILED,
    payload: error,
  };
}


export function addRequest(subjectId, sectionId, studentId) {
  return {
    type: studentsActionTypes.ADD_REQUEST,
    payload: {
      subjectId, sectionId, studentId,
    },
  };
}

export function addCompleted(student) {
  return {
    type: studentsActionTypes.ADD_COMPLETED,
    payload: student,
  };
}

export function addFailed(error) {
  return {
    type: studentsActionTypes.ADD_FAILED,
    payload: error,
  };
}

export function removeRequest(subjectId, sectionId, studentId) {
  return {
    type: studentsActionTypes.REMOVE_REQUEST,
    payload: {
      subjectId, sectionId, studentId,
    },
  };
}

export function removeCompleted(studentId) {
  return {
    type: studentsActionTypes.REMOVE_COMPLETED,
    payload: studentId,
  };
}

export function removeFailed(error) {
  return {
    type: studentsActionTypes.REMOVE_FAILED,
    payload: error,
  };
}

export function gradeRequest(subjectId, sectionId, studentId, grade) {
  return {
    type: studentsActionTypes.GRADE_REQUEST,
    payload: {
      subjectId, sectionId, studentId, grade,
    },
  };
}

export function gradeCompleted(gradedStudent) {
  return {
    type: studentsActionTypes.GRADE_COMPLETED,
    payload: gradedStudent,
  };
}

export function gradeFailed(error) {
  return {
    type: studentsActionTypes.GRADE_FAILED,
    payload: error,
  };
}

export function gradeAllRequest(subjectId, sectionId, grade) {
  return {
    type: studentsActionTypes.GRADE_ALL_REQUEST,
    payload: {
      subjectId, sectionId, grade,
    },
  };
}

export function gradeAllCompleted(gradesState) {
  return {
    type: studentsActionTypes.GRADE_ALL_COMPLETED,
    payload: gradesState,
  };
}

export function gradeAllFailed(error) {
  return {
    type: studentsActionTypes.GRADE_ALL_FAILED,
    payload: error,
  };
}


export const loaderActions = new LoaderMiddleware('students');
