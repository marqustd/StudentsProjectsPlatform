import {
  authGet, gatewayWorkflow,
} from '../methods';

export async function getTest() {
  const promise = authGet('http://localhost:5001/api/values/auth');
  const result = await gatewayWorkflow(promise);
  return result;
}
