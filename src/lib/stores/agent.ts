import type { Identifiable } from "./type";

// Type Đại lý
export type Agent = Identifiable & {
    user_id: number;
    agentname: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    level: number;
    status: number;
    ref_code_owner: string; // Mã tham chiếu của bản thân đại lý
    ref_code_agent: string; // Mã tham chiếu đến đại lý cấp trên
    amount: number;
    user_created_id: string; // Người quản lý
    image_links: string; // Ảnh cá nhân
    citizen_id_img_1: string; // Ảnh CCCD mặt trước
    citizen_id_img_2: string; // Ảnh CCCD mặt sau
    numberOfReports?: number; // Số lượng báo cáo
    numOfTranferReports?: number; // Số lượng báo cáo đã chuyển
}

export type AgentTreeView = Agent & {
    children: AgentTreeView[]
}