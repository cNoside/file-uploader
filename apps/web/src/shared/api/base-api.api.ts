import { AxiosInstance } from 'axios';

import { client } from 'shared/config';

export class BaseAPI {
  constructor(protected readonly axios: AxiosInstance = client) {}
}
