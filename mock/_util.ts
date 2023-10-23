export function success<T = Recordable>(data?: T) {
  return { data, msg: 'success', result_code: '200' };
}
