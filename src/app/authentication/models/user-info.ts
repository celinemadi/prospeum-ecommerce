import {TokenResponse} from './token-response';
import {ParsedToken} from './parsed-token';

export interface UserInfo {
  tokens?: TokenResponse;
  user?: ParsedToken;
}
