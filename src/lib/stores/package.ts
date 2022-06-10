import { writable } from "svelte/store";
import type { Identifiable } from "./type";

// Type gói bán
export type Package = Identifiable & {
    package_name: string;
    amount: number;
    price: number;
    update_user_id: number;
    color: string;
    expiry_time: number; // Theo ngày
};

export type PackageFormData = {
    package_name?: string;
    amount?: number;
    price?: number;
    update_user_id?: number;
    color?: string;
    expiry_time?: number;
}

export const packagesStore = writable<Package[]>([]);