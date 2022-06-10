import { authStore } from "$lib/stores/auth";
import type { ResponseResultError } from "$lib/stores/type";
import { redirect } from "$lib/utils/redirect";

export const ResponseHeaders = {
  "Content-Type": "application/vnd.api+json",
  Accept: "application/vnd.api+json",
};

export const ResponseAuthorizationHeaders = {
  ...ResponseHeaders,
  Authorization: "",
};

export function getResponseAuthorizationHeaders() {
  const headers = ResponseAuthorizationHeaders;
  // authStore.subscribe((s) => {
  //   if (s.token) {
  //     headers.Authorization = `${s.token.token_type} ${s.token.access_token}`;
  //   }
  // });
  return headers;
}

export function getErrorMessage(error: string | ResponseResultError[]): string {
  if (typeof error === "string") {
    return error;
  } else if (Array.isArray(error) && error.length > 0) {
    return error[0].detail;
  } else {
    return "Có lỗi xảy ra! Vui lòng thử lại sau";
  }
}

export function getResponseStatus(error: ResponseResultError[]): number | null {
  if (error.length > 0) {
    return parseInt(error[0].status);
  }
  return null;
}

export function handleError(error: ResponseResultError[]){
  const status = getResponseStatus(error);
  switch(status){
    case 401:
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        authStore.set({user: null, token: null});
        window.notice({
          text: "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại",
          type: "warning",
        });
        window.closeLoading();
        redirect('/login');
      break;
  }
}
