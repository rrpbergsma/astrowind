import { getPermalink, getAsset } from './utils/permalinks';
import { getTranslation } from './i18n/translations';

export const getHeaderData = (lang = 'en') => {
  const t = getTranslation(lang);
  
  // For hash links on the homepage, we need special handling
  const homeHashLink = (hash) => {
    // Create an absolute path to the homepage with the language prefix
    // and then append the hash
    return getPermalink('/', 'page', lang) + hash;
  };
  
  return {
    links: [
      {
        text: t.navigation.home,
        href: getPermalink('/', 'page', lang),
      },
      {
        text: t.homepage?.services?.tagline || 'Services',
        href: homeHashLink('#services'),
      },
      { text: t.homepage?.contact?.title || 'Contact', href: homeHashLink('#contact') },
      {
        text: t.metadata?.aboutUs || 'About Me',
        links: [
          { text: t.navigation.about, href: getPermalink('/aboutme', 'page', lang), isHashLink: false },
          { text: t.navigation.resume, href: getPermalink('/aboutme', 'page', lang) + '#resume', isHashLink: true },
          { text: t.navigation.certifications, href: getPermalink('/aboutme', 'page', lang) + '#certifications', isHashLink: true },
          { text: t.navigation.skills, href: getPermalink('/aboutme', 'page', lang) + '#skills', isHashLink: true },
          { text: t.navigation.education, href: getPermalink('/aboutme', 'page', lang) + '#education', isHashLink: true },
        ]
      },
      { text: t.navigation.blog, href: getPermalink('/blog', 'page', lang)  },
    ]
  };
};

// For backward compatibility
export const headerData = getHeaderData();

export const getFooterData = (lang = 'en') => {
  return {
    secondaryLinks: [
      { text: 'Terms', href: getPermalink('/terms', 'page', lang) },
      { text: 'Privacy Policy', href: getPermalink('/privacy', 'page', lang) },
    ],
    socialLinks: [
      { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/rrpbergsma' },
      { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/rrpbergsma' },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    ],
  };
};

// For backward compatibility
export const footerData = getFooterData();
