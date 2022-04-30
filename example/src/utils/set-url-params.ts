export type UrlParams = Record<string, string | number>;

export function setUrlParams(url: string, params: UrlParams): string {
  let result = url;
  Object.entries(params).forEach(([param, value]) => {
    const pattern = new RegExp(`:${param}`, 'g');
    result = result.replace(pattern, value.toString());
  });
  return result;
}
