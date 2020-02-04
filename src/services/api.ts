import { request } from 'alita';

export async function query(data): Promise<any> {
  return request('/api/list', { data });
}
