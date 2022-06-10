import { apiUrl } from '$lib/env';
import type { Category, CategoryFormData } from '$lib/stores/numerology';
import type { DataWithPagination, QueryParams } from '$lib/stores/type';
import { pget } from '$lib/utils/fetch';
import { getErrorMessage, getResponseAuthorizationHeaders } from '$lib/utils/response';
import { objectToQueryString } from '$lib/utils/string';
const endpoint = 'categories';

export const getListCategoriesService = async (
	queryParams?: QueryParams
): Promise<DataWithPagination<Category>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}?${objectToQueryString(queryParams)}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Category> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(error);
		}
	});
};

export const createCategoryService = async (formData: CategoryFormData): Promise<Category> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}`, {
			method: 'POST',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: Category } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const updateCategoryService = async (
	id: number,
	formData: CategoryFormData
): Promise<Category> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/${id}`, {
			method: 'PUT',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: Category } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const deleteCategoryService = async (id: number): Promise<Category> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/${id}`, {
			method: 'DELETE',
			headers: getResponseAuthorizationHeaders()
		});
		if (res.ok) {
			const data: { results: Category } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const getCategoryService = async (id: number): Promise<Category> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}/?id=${id}`, {
			method: 'GET',
			headers: getResponseAuthorizationHeaders()
		});
		if (res.ok) {
			const data: { results: DataWithPagination<Category> } = await res.json();
			if (data.results.data && data.results.data?.length > 0) {
				resolve(data.results.data[0]);
			} else {
				reject(getErrorMessage('Không tìm thấy điều này!'));
			}
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};
