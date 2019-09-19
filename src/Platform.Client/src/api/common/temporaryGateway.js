import {
  gatewayWorkflow, authGet, authPatch, authPost, authUpload, authDelete,
} from '../methods';
import { ajaxTypes } from '../../store/common/temporary/actions';


export async function ajax(url, method, body) {
  let fetchPromise;
  switch (method) {
    case ajaxTypes.POST:
      fetchPromise = authPost(url, body);
      break;

    case ajaxTypes.DELETE:
      fetchPromise = authDelete(url, body);
      break;

    case ajaxTypes.PATCH:
      fetchPromise = authPatch(url, body);
      break;

    case ajaxTypes.UPLOAD:
      fetchPromise = authUpload(url, body);
      break;

    case ajaxTypes.GET:
    default:
      fetchPromise = authGet(url);
      break;
  }

  const result = await gatewayWorkflow(fetchPromise);
  return result;
}
