import { writable } from "svelte/store";
import type {
  CreatedByable,
  DataWithPagination,
  Identifiable,
  STATUS,
  Timeable,
  UpdatedByable,
} from "./type";

// Type nhóm số
export type BaseCategory = Timeable &
  CreatedByable &
  UpdatedByable & {
    cat_name: string;
    description?: string;
    photo?: string;
    status?: STATUS;
    x_order?: number;
  };

export type Category = Identifiable & BaseCategory;

export type CategoryFormData = BaseCategory;

export const categoriesStore = writable<Category[]>([]);

// Type con số
export type BaseCategoryNumber = Timeable &
  CreatedByable &
  UpdatedByable & {
    category_id: number;
    category?: Category;
    number: number;
    photo_link: string;
    name: string;
    description: string;
    status: number;
    numberPhotos?: NumberPhoto[];
    x_order?: number;
  };
export type CategoryNumber = Identifiable & BaseCategoryNumber;

export type CategoryNumberFormData = BaseCategoryNumber;

export const categoryNumbersDataStore = writable<DataWithPagination<CategoryNumber>>();


// Type ảnh của con số
export type NumberPhoto = Identifiable &
  Timeable &
  CreatedByable &
  UpdatedByable & {
    number_id: number;
    number?: CategoryNumber;
    photo_link: string;
    name: string;
    description: string;
    status: number;
  };
