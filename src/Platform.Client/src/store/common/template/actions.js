export const TemplateActionTypes = {
  TEMPLATE_REQUEST: 'template/TEMPLATE_REQUEST',
  TEMPLATE_COMPLETED: 'template/TEMPLATE_COMPLETED',
  TEMPLATE_FAILED: 'template/TEMPLATE_FAILED',
};

export function requestGetAll() {
  return {
    type: TemplateActionTypes.TEMPLATE_REQUEST,
  };
}
export function getAllCompleted(data) {
  return {
    type: TemplateActionTypes.TEMPLATE_COMPLETED,
    payload: data,
  };
}

export function getAllFailed(data) {
  return {
    type: TemplateActionTypes.TEMPLATE_FAILED,
    payload: data,
  };
}
