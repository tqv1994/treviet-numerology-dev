import { apiUrl } from "$lib/env";
import type { Package } from "$lib/stores/package";
import type { PackageFormData } from "$lib/stores/package";
import type { DataWithPagination, QueryParams } from "$lib/stores/type";
import {
  getErrorMessage,
  getResponseAuthorizationHeaders,
} from "$lib/utils/response";
import { objectToQueryString } from "$lib/utils/string";

const endpoint = "/packages";

export const getListPackagesService = async (
  queryParams: QueryParams
): Promise<DataWithPagination<Package>> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(
      `${apiUrl}${endpoint}?${objectToQueryString(queryParams)}`,
      {
        method: "GET",
        headers: getResponseAuthorizationHeaders(),
      }
    );
    if (res.ok) {
      const data: { results: DataWithPagination<Package> } = await res.json();
      resolve(data.results);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};

export const updatePackageService = async (
  formData: PackageFormData
): Promise<Package> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}${endpoint}`, {
      method: "POST",
      headers: getResponseAuthorizationHeaders(),
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const data: { results: Package } = await res.json();
      resolve(data.results);
    } else {
      const error = await res.json();
      reject(getErrorMessage(error.errors));
    }
  });
};
