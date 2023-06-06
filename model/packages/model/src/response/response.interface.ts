import { RequestRef } from '../request';

export interface IResponse {
  success: boolean;
  ref?: RequestRef;
}
