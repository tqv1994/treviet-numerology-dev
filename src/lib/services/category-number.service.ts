import { apiUrl } from '$lib/env';
import type { CategoryNumberFormData, CategoryNumber } from '$lib/stores/numerology';
import type { DataWithPagination, QueryParams } from '$lib/stores/type';
import { pget } from '$lib/utils/fetch';
import { getErrorMessage, getResponseAuthorizationHeaders, handleError } from '$lib/utils/response';
import { objectToQueryString } from '$lib/utils/string';
const endpoint = 'category-numbers';

export const getListCategoryNumbersService = async (
	queryParams?: QueryParams
): Promise<DataWithPagination<CategoryNumber>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}/searches?${objectToQueryString(queryParams)}`);
		if (res.ok) {
			const data: { results: DataWithPagination<CategoryNumber> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(error);
		}
	});
};

export const createCategoryNumberService = async (
	formData: CategoryNumberFormData
): Promise<CategoryNumber> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}`, {
			method: 'POST',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: CategoryNumber } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(getErrorMessage(error.errors));
		}
	});
};

export const updateCategoryNumberService = async (
	id: number,
	formData: CategoryNumberFormData
): Promise<CategoryNumber> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/${id}`, {
			method: 'PUT',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: CategoryNumber } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(getErrorMessage(error.errors));
		}
	});
};

export const deleteCategoryNumberService = async (id: number): Promise<CategoryNumber> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/${id}`, {
			method: 'DELETE',
			headers: getResponseAuthorizationHeaders()
		});
		if (res.ok) {
			const data: { results: CategoryNumber } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(getErrorMessage(error.errors));
		}
	});
};

export const getCategoryNumberService = async (id: number): Promise<CategoryNumber> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/?id=${id}`, {
			method: 'GET',
			headers: getResponseAuthorizationHeaders()
		});
		if (res.ok) {
			const data: { results: DataWithPagination<CategoryNumber> } = await res.json();
			if (data.results.data && data.results.data?.length > 0) {
				resolve(data.results.data[0]);
			} else {
				reject(getErrorMessage('Không tìm thấy điều này!'));
			}
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(getErrorMessage(error.errors));
		}
	});
};
