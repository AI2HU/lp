import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['fr', 'en'];
const defaultLocale = 'fr';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLanguages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = '1'] = lang.trim().split(';q=');
      return { locale: locale.split('-')[0], quality: parseFloat(q) };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { locale } of preferredLanguages) {
    if (locales.includes(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  
  if (locale === 'fr') {
    const url = request.nextUrl.clone();
    url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|images).*)',
  ],
};

