import type { Package } from "./package";
import type { Identifiable } from "./type";

// Type giao dịch mua gói
export type Purchase = Identifiable & {
    purchase_date: string;
    total: number; // Tổng số lượng
    total_price: number;
    agent_id: number;
    created_user_id: number;
    update_user_id: number;
    purchaseDetails?: PurchaseDetail[];
}

// Type giao dịch chi tiết
export type PurchaseDetail = Identifiable & {
    purchase_id: number;
    package_id: number;
    num_of_reports: number;
    amount: number;
    price: number;
    package?: Package;
};


// Type form mua gói
export type PurchaseFormData = {
    username?: string;
    agent_name?: string;
    package_id?: number;
    code_2fa?: string; 
}