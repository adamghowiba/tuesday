import axios from 'axios';
import { filterEmptyKeys } from '@tuesday/utils';
import { Board } from './modules/board.access';
import { Columns } from './modules/columns.access';
import { Items } from './modules/items.access';
import { Statuses } from './modules/stauses.access';
import { Groups } from './modules/groups.access';

const DEFAULT_HOST = 'https://api.tuesday.com';
const DEFAULT_VERSION: RequestParams['version'] = 'v1';

type RequestType = 'get' | 'post' | 'patch' | 'put' | 'delete';

interface RequestOptions {
  credentials: boolean;
}

interface RequestParams {
  version: 'v1';
  host: string;
}

interface RequestData {
  params?: object;
  body?: object;
}

export class Request {
  private DEFAULT_REQUEST_OPTIONS: RequestOptions = {
    credentials: true,
  };
  public params: RequestParams;

  constructor(params?: Partial<RequestParams>) {
    this.params = { host: DEFAULT_HOST, version: DEFAULT_VERSION, ...params };
  }

  async request<T>(
    type: RequestType,
    path: string,
    data: RequestData,
    options?: Partial<RequestOptions>
  ) {
    options = { ...this.DEFAULT_REQUEST_OPTIONS, ...options };

    const response = axios.request<T>({
      url: `${this.params.host}/${this.params.version}${path}`,
      method: type,
      withCredentials: true,
      data: data.body,
      params: data.params,
    });

    return response;
  }

  /**
   * Get request
   * @param path URL path denoting the resoruce to request EX. /users
   */
  async get<T, Q extends object = any>(
    path: string,
    queryParams?: Q,
    requestOptions?: Partial<RequestOptions>
  ) {
    if (queryParams) queryParams = filterEmptyKeys(queryParams) as Q;

    return this.request<T>(
      'get',
      path,
      { params: queryParams },
      requestOptions
    );
  }

  async post<T>(path: string, body: object, params?: object) {
    return this.request<T>('post', path, { params, body });
  }

  async patch<T>(path: string, body: object, params?: object) {
    return this.request<T>('patch', path, { params, body });
  }

  async put<T>(path: string, body: object, params?: object) {
    return this.request<T>('put', path, { params, body });
  }

  async delete<T>(path: string, params?: object) {
    return this.request<T>('delete', path, { params });
  }
}

export class TuesdayApi {
  public board: Board;
  public columns: Columns;
  public items: Items;
  public statuses: Statuses;
  public groups: Groups;

  constructor(public params?: Partial<RequestParams>) {
    const request = new Request(params);

    this.groups = new Groups(request);
    this.statuses = new Statuses(request);
    this.board = new Board(request);
    this.columns = new Columns(request);
    this.items = new Items(request);
  }
}
