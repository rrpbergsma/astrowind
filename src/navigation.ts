import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    { text: 'About', href: getPermalink('/en/about')},
    { text: 'Resume', href: getPermalink('/en/resume') },
    { text: 'Certifications', href: getPermalink('/en/Certifications') },
    { text: 'Skills', href: getPermalink('/en/skills') },
    { text: 'Blog', href: getPermalink('/blog')  },
  ]
};

export const footerData = {

  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/rrpbergsma' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/rrpbergsma' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
};
