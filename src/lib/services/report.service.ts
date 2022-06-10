import { apiUrl } from '$lib/env';
import type { Report, ReportFormData } from '$lib/stores/report';
import type { DataWithPagination, QueryParams } from '$lib/stores/type';
import { pget } from '$lib/utils/fetch';
import { getErrorMessage, getResponseAuthorizationHeaders, handleError } from '$lib/utils/response';
import { objectToQueryString } from '$lib/utils/string';
const endpoint = 'reports';

export const getListReportsService = async (
	queryParams: QueryParams
): Promise<DataWithPagination<Report>> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}?${objectToQueryString(queryParams)}`, {
			method: 'GET',
			headers: getResponseAuthorizationHeaders()
		});
		if (res.ok) {
			const data: { results: DataWithPagination<Report> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(error);
		}
	});
};

export const createReportService = async (formData: ReportFormData): Promise<Report> => {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`${apiUrl}${endpoint}`, {
			method: 'POST',
			headers: getResponseAuthorizationHeaders(),
			body: JSON.stringify(formData)
		});
		if (res.ok) {
			const data: { results: Report } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			reject(getErrorMessage(error.errors));
		}
	});
};

export const getListFilterDateReportService = async (
	from_date: string,
	to_date: string
): Promise<DataWithPagination<Report>> => {
	return new Promise(async (resolve, reject) => {
		const res = await pget(`${endpoint}/filter?from_date=${from_date}&to_date=${to_date}`);
		if (res.ok) {
			const data: { results: DataWithPagination<Report> } = await res.json();
			resolve(data.results);
		} else {
			const error = await res.json();
			handleError(error.errors);
			reject(error);
		}
	});
};
