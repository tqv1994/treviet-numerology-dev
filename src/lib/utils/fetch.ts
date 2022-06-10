import { apiUrl } from "$lib/env";
import { getCookie } from "$lib/utils/cookies";
export type SvelteFetch = (
    info: RequestInfo,
    init?: RequestInit | undefined,
  ) => Promise<Response>;
  
  export function parseId(slug: string): string {
    const match = slug.match(/(?!=)\w+$/g); // Look for a - (hyphen) followed by a \w
    return match ? match[0] : slug;
  }
  
  export const makeErrorResponse = (
    status: number,
    code: string,
    message: string,
    headers?: Headers,
  ) =>
    new Response(
      JSON.stringify({
        code,
        status,
        message,
      }),
      {
        status,
        headers,
      },
    );
  
  export function makeEmptyResponse(status: number) {
    return new Response(null, { status });
  }
  
  export const defaultHeaders = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  };
  
  export async function pauth(token: string): Promise<Response> {
    const res = await fetch(`/p/users/profile`, {
      headers: {
        ...defaultHeaders,
        Authorization: 'Bearer ' + token,
      },
    });
    return res;
  }
  
  export function pget(path: string): Promise<Response> {
    return fetch(`/p/${path}`, {
      headers: defaultHeaders,
    });
  }
  
  export function pput(
    path: string,
    body: Record<string, unknown>,
  ): Promise<Response> {
    return fetch(`/p/${path}`, {
      method: 'PUT',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
  }
  
  export function ppost(
    path: string,
    body: Record<string, unknown>,
  ): Promise<Response> {
    return fetch(`/p/${path}`, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(body),
    });
  }
  
  export function pupload(path: string, body: FormData): Promise<Response> {
    return fetch(`/p/${path}`, {
      method: 'POST',
      body,
    });
  }
  
  export function pdelete(path: string): Promise<Response> {
    return fetch(`/p/${path}`, {
      method: 'DELETE',
      headers: defaultHeaders
    });
  }
  
  export function ppostWithFile(path: string, body: FormData): Promise<Response> {
    return fetch(`${apiUrl}/${path}`, {
      method: 'POST',
      body,
      headers:{
        Authorization: 'Bearer ' + getCookie('token'),
        Accept: "application/vnd.api+json",
      }
    });
  }
  
  export function pputWithFile(
    path: string,
    body: FormData,
  ): Promise<Response> {
    return fetch(`${apiUrl}/${path}?_method=PUT`, {
      method: 'POST',
      body,
      headers:{
        Authorization: 'Bearer ' + getCookie('token'),
        Accept: "application/vnd.api+json",
      }
    });
  }
  