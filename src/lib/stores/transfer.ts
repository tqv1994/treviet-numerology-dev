import type { Package } from "./package";
import type { CreatedByable, Identifiable, Timeable, UpdatedByable } from "./type"

// Type chuyển báo cáo
export type Transfer = Identifiable & Timeable & CreatedByable & UpdatedByable & {
    transfer_date: string;
    agent_id: number;
    agent_receive_id: number;
    total: number;
    transferDetails?: TransferDetail[];
}

// Type chuyển báo cáo chi tiết
export type TransferDetail = Identifiable & {
    transfer_id: number;
    package_id: number;
    amount: number;
    num_of_reports: number;
    transfer?: Transfer;
    package?: Package;
}

export type TransferForm = {
    agent_receive_id?: number;
    agent_id?: number;
    package_id?: number;
    one_time_password: string; // 2fa
    transfer_date?: string;
}