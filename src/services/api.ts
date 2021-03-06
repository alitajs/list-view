import { request } from 'alita';

export async function query(data): Promise<any> {
  return request('/api/list', { data }).then(result => result);
}

export async function loadmore(data): Promise<any> {
  return request('/api/loadmore', { data }).then(result => result);
}
