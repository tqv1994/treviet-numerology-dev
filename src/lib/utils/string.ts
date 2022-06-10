import type { QueryParams } from "$lib/store/type";

export const objectToQueryString = (obj?: any, prefix?: string): string => {
  if (!obj) {
    return "";
  }
  const query = Object.keys(obj).map((key) => {
    const value = obj[key];

    if (obj.constructor === Array) key = `${prefix}[]`;
    else if (obj.constructor === Object)
      key = prefix ? `${prefix}[${key}]` : key;

    if (typeof value === "object") return objectToQueryString(value, key);
    else return `${key}=${encodeURIComponent(value)}`;
  });

  return [].concat.apply([], query).join("&");
};

export const convertObjectToQueryStringByType = (
  type: string,
  queryParams: QueryParams
): string => {
  let obj: any = {};
  for (const i in queryParams) {
    if (i == "search") {
      obj[type] = queryParams[i];
    } else if (i == "perPage") {
      obj["per-page"] = queryParams[i];
    } else {
      obj[i] = queryParams[i];
    }
  }
  return objectToQueryString(obj);
};

export const queryURLParamToJSON = (query: string) => {
  const re = /([^&=]+)=?([^&]*)/g;
  const decodeRE = /\+/g;

  const decode = function (str: string) {
    return decodeURIComponent(str.replace(decodeRE, " "));
  };

  let params: any = {},
    e;
  while ((e = re.exec(query))) {
    let k = decode(e[1]),
      v = decode(e[2]);
    if (k.substring(k.length - 2) === "[]") {
      k = k.substring(0, k.length - 2);
      (params[k] || (params[k] = [])).push(v);
    } else params[k] = v;
  }

  const assign = function (obj: any, keyPath: string, value: any) {
    let lastKeyIndex = keyPath.length - 1;
    for (let i = 0; i < lastKeyIndex; ++i) {
      let key = keyPath[i];
      if (!(key in obj)) obj[key] = {};
      obj = obj[key];
    }
    obj[keyPath[lastKeyIndex]] = value;
  };

  for (let prop in params) {
    let structure = prop.split("[");
    if (structure.length > 1) {
      let levels: any = [];
      structure.forEach(function (item, i) {
        let key = item.replace(/[?[\]\\ ]/g, "");
        levels.push(key);
      });
      assign(params, levels, params[prop]);
      delete params[prop];
    }
  }
  return params;
};
