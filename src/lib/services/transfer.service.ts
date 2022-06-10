import { apiUrl } from "$lib/env";
import type { Agent } from "$lib/stores/agent";
import type { Transfer, TransferFormData } from "$lib/stores/transfer";
import type { DataWithPagination, QueryParams } from "$lib/stores/type";
import { pget } from "$lib/utils/fetch";
import {
  getErrorMessage,
  getResponseAuthorizationHeaders,
  handleError,
} from "$lib/utils/response";
import { objectToQueryString } from "$lib/utils/string";
const endpoint = "transfers";

export const getListTransfersService = async (
	queryParams?: QueryParams
): Promise<DataWithPagination<Transfer>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}?${objectToQueryString(queryParams)}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Transfer> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(error);
		}
	});
};

export const createTransferService = async (formData: TransferFormData): Promise<Transfer> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}`, {
			method: 'POST',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: Transfer } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const getListFilterDateTransferService = async (
	from_date: string,
	to_date: string
): Promise<DataWithPagination<Transfer>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}/filter?from_date=${from_date}&to_date=${to_date}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Transfer> } = await res.json();
			if (data.results.data && data.results.data?.length > 0) {
				resolve(data.results);
			} else {
				reject(getErrorMessage('Không tìm thấy điều này!'));
			}
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};



