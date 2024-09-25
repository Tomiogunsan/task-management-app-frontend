export type IQueryParams = {
  [key: string]: string | number | boolean | null | string[] | undefined;
};
export const queryParamsHelper = (queryParams: IQueryParams): string => {
  const validParams: string[] = [];

  for (const [key, value] of Object.entries(queryParams || {})) {
    if (key && value !== undefined && value !== null && value !== "") {
      if (key === "page" && value === 0) {
        validParams.push("page=1");
      } else if (Array.isArray(value)) {
        const arrayToString = value.toString().replaceAll(",", `&${key}=`);

        validParams.push(`${key}=${arrayToString}`);
      } else {
        validParams.push(`${key}=${value}`);
      }
    }
  }

  if (validParams.length === 0) {
    return "";
  }

  return "?" + validParams.join("&");
};

export const deDupliacteParams = (url: string) => {
  const [path, params] = url.split("?");
  const result =
    path +
    "?" +
    new URLSearchParams(
      Object.fromEntries(new URLSearchParams(params))
    ).toString();
  return result;
};
