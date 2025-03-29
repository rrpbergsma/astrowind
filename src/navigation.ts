import { getPermalink, getAsset } from './utils/permalinks';
import { getTranslation } from './i18n/translations';

export const getHeaderData = (lang = 'en') => {
  const t = getTranslation(lang);

  // For hash links on the homepage, we need special handling
  const homeHashLink = (hash) => {
    // Create an absolute path to the homepage with the language prefix
    // and include the hash in the permalink generation
    return getPermalink('/' + hash, 'page', lang);
  };

  return {
    links: [
      {
        text: t.navigation.home,
        href: getPermalink('/', 'page', lang),
      },
      {
        text: t.navigation.services,
        href: homeHashLink('#services'),
      },
      { text: t.navigation.contact, href: homeHashLink('#contact') },
      {
        text: t.metadata?.aboutUs || 'About Me',
        links: [
          { text: t.navigation.about, href: getPermalink('/aboutme', 'page', lang), isHashLink: false },
          { text: t.navigation.resume, href: getPermalink('/aboutme', 'page', lang) + '#resume', isHashLink: true },
          {
            text: t.navigation.certifications,
            href: getPermalink('/aboutme', 'page', lang) + '#certifications',
            isHashLink: true,
          },
          { text: t.navigation.skills, href: getPermalink('/aboutme', 'page', lang) + '#skills', isHashLink: true },
          {
            text: t.navigation.education,
            href: getPermalink('/aboutme', 'page', lang) + '#education',
            isHashLink: true,
          },
        ],
      },
    ],
  };
};

// For backward compatibility - but don't use this directly, always use getHeaderData(lang) to ensure translations
export const headerData = (lang = 'en') => getHeaderData(lang);

export const getFooterData = (lang = 'en') => {
  const t = getTranslation(lang);

  return {
    secondaryLinks: [
      { text: t.footer.terms, href: getPermalink('/terms', 'page', lang) },
      { text: t.footer.privacyPolicy, href: getPermalink('/privacy', 'page', lang) },
    ],
    socialLinks: [
      { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/rrpbergsma' },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/rrpbergsma' },
    ],
  };
};

// For backward compatibility
export const footerData = getFooterData();
