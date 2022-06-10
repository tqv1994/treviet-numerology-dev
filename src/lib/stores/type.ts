import type { User } from "./auth";

export type Base = Identifiable;

export type Identifiable = {
  id: number;
};

export type Timeable = {
  created_at?: string;
  updated_at?: string;
};

export type CreatedByable = {
  created_user_id?: number;
  created_user?: User;
};

export type UpdatedByable = {
  update_user_id?: number;
  update_user?: User;
};

export type ResponseResult<T> = {
  status_code: number;
  results: T;
  message: string;
};

export type ResponseResultError = {
  status: string;
  title: string;
  detail: string;
};

export type ResponseResultSuccess<T> = {
  data: T;
};

export type QueryParams = {
  id?: number;
  keyword?: string;
  page?: number;
  perPage?: number;
  sort?: string;
  type?: "DESC" | "ASC";
};

export type DataWithPagination<T> = {
  data?: T[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
};

export enum STATUS {
  ACTIVE = 1,
  INACTIVE = 0
}

export const STATUS_LABEL = {
  1: "Hoạt động",
  0: "Không hoạt động"
}
