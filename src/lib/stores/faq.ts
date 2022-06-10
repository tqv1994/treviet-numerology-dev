import type {
  CreatedByable,
  Identifiable,
  Timeable,
  UpdatedByable,
} from "./type";
import { writable } from "svelte/store";
// Type hỏi đáp
export type Faq = Identifiable & Timeable & CreatedByable & UpdatedByable & {
    question: string;
    answer: string;
};
export type FaqsFormData = {
  question?: string;
  answer?: string;
}
export const faqsStore = writable<Faq[]>([]);
