import type { Token, User } from "$lib/stores/auth";
import { authStore } from "$lib/stores/auth";
import type { ResponseResult, ResponseResultSuccess } from "$lib/stores/type";
import {
  getErrorMessage,
  getResponseAuthorizationHeaders,
  getResponseStatus,
  ResponseHeaders,
} from "$lib/utils/response";

import { apiUrl, frontendUrl } from "$lib/env";
import { RESET_PASSWORD_LINK } from "$lib/utils/const";

export type LoginForm = {
  email: string;
  password: string;
};

/**
 * Call login API
 * @param params: LoginForm
 * @returns
 */

export const loginService = async (params: LoginForm): Promise<Token> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}login`, {
      method: "POST",
      headers: { ...ResponseHeaders },
      body: JSON.stringify({
        data: {
          type: "token",
          attributes: { ...params },
        },
      }),
    });
    if (res.ok) {
      const data: Token = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(getErrorMessage(error.errors));
    }
  });
};

/**
 * Call register API
 * @param params: RegisterForm
 * @returns
 */
export const registerService = async (
  params: RegisterForm
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}register`, {
      method: "POST",
      headers: { ...ResponseHeaders },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data: boolean = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};

/**
 * Call password forgot API
 * @param params: ForgotPasswordForm
 * @returns
 */
export const forgotPasswordService = async (
  params: ForgotPasswordForm
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}password-forgot`, {
      method: "POST",
      headers: { ...ResponseHeaders },
      body: JSON.stringify({
        data: {
          type: "password-forgot",
          attributes: { ...params, redirect_url: `${RESET_PASSWORD_LINK}` },
        },
      }),
    });
    if (res.ok) {
      const data: boolean = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(getErrorMessage(error.errors));
    }
  });
};

/**
 * Call reset password API
 * @param params: ResetPasswordForm
 * @returns
 */
export const resetPasswordService = async (
  params: ResetPassword
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}/reset-password`, {
      method: "POST",
      headers: { ...ResponseHeaders },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const data: boolean = await res.json();
      resolve(data);
    } else {
      const error = await res.json();
      reject(error);
    }
  });
};

export const getMeService = async (): Promise<User> => {
  return new Promise(async (resolve, reject) => {
    const res = await fetch(`${apiUrl}me`, {
      method: "GET",
      headers: getResponseAuthorizationHeaders(),
    });
    if (res.ok) {
      const data: ResponseResultSuccess<User> = await res.json();
      resolve(data.data);
    } else {
      const error = await res.json();

      if (getResponseStatus(error.errors) === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      reject(getErrorMessage(error.errors));
    }
  });
};
