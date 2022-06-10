import * as cookie from 'cookie';

export function getSessionCookie(cookieString?: string | null): string {
  if (cookieString) {
    const cookies = cookie.parse(cookieString);
    const { session, 'session.sig': sig } = cookies;
    if (session && sig) {
      return `session=${session};session.sig=${sig}`;
    }
  }
  return '';
}

export function extractSetCookieHeader(headers: Headers): HeadersInit {
  const newHeaders = new Headers();
  if (headers.has('set-cookie')) {
    const cookieString =
      headers.get('set-cookie')?.replace(' httponly', '').replace(';,', ';') ||
      '';
    const cookies = cookie.parse(cookieString);
    if (cookies.session && cookies['session.sig'] && cookies.expires) {
      const opts = {
        expires: new Date(cookies.expires),
        path: '/',
      };
      newHeaders.set(
        'set-cookie',
        cookie.serialize('session', cookies.session, opts),
      );
      newHeaders.append(
        'set-cookie',
        cookie.serialize('session.sig', cookies['session.sig'], {
          ...opts,
          httpOnly: true,
        }),
      );
    }
  }
  return newHeaders;
}
