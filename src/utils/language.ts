import { supportedLanguages } from '~/i18n/translations';

// Define the type for supported languages
type SupportedLanguage = (typeof supportedLanguages)[number];

export function detectPreferredLanguage(request: Request): SupportedLanguage {
  // Check for language preference in cookies (set by client-side JS)
  const cookies = request.headers.get('cookie') || '';
  const cookieLanguage = cookies
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('preferredLanguage='))
    ?.split('=')[1];

  // Get the user's preferred language from the browser if no cookie
  const acceptLanguage = request.headers.get('accept-language') || '';

  // Use cookie language if available, otherwise detect from browser
  const preferredLanguage =
    cookieLanguage && supportedLanguages.includes(cookieLanguage as SupportedLanguage)
      ? (cookieLanguage as SupportedLanguage)
      : acceptLanguage
          .split(',')
          .map((lang) => lang.split(';')[0].trim().substring(0, 2))
          .find((lang) => supportedLanguages.includes(lang as SupportedLanguage)) || 'en';

  return preferredLanguage as SupportedLanguage;
}
