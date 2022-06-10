import { apiUrl } from '$lib/env';
import type { Purchase, PurchaseFormData } from '$lib/stores/purchase';
import type { DataWithPagination, QueryParams } from '$lib/stores/type';
import { pget } from '$lib/utils/fetch';
import { getErrorMessage, getResponseAuthorizationHeaders, handleError } from '$lib/utils/response';
import { objectToQueryString } from '$lib/utils/string';
const endpoint = 'purchases';

export const getListPurchasesService = async (
	queryParams?: QueryParams
): Promise<DataWithPagination<Purchase>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}?${objectToQueryString(queryParams)}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Purchase> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(error);
		}
	});
};

export const createPurchaseService = async (formData: PurchaseFormData): Promise<Purchase> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}`, {
			method: 'POST',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: Purchase } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const getListFilterDatePurchaseService = async (
	from_date: string,
	to_date: string
): Promise<DataWithPagination<Purchase>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}/filter?from_date=${from_date}&to_date=${to_date}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Purchase> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(error);
		}
	});
};
