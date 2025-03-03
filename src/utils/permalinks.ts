import slugify from 'limax';

import { SITE, APP_BLOG } from 'astrowind:config';

import { trim } from '~/utils/utils';

export const trimSlash = (s: string) => trim(trim(s, '/'));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
  return '/' + paths + (SITE.trailingSlash && paths && !paths.includes('#') ? '/' : '');
};

const BASE_PATHNAME = SITE.base || '/';

export const cleanSlug = (text = '') =>
  trimSlash(text)
    .split('/')
    .map((slug) => slugify(slug))
    .join('/');

export const BLOG_BASE = cleanSlug(APP_BLOG?.list?.pathname);
export const CATEGORY_BASE = cleanSlug(APP_BLOG?.category?.pathname);
export const TAG_BASE = cleanSlug(APP_BLOG?.tag?.pathname) || 'tag';

export const POST_PERMALINK_PATTERN = trimSlash(APP_BLOG?.post?.permalink || `${BLOG_BASE}/%slug%`);

/** */
export const getCanonical = (path = ''): string | URL => {
  let url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash == false && path && url.endsWith('/')) {
    url = url.slice(0, -1);
  } else if (SITE.trailingSlash == true && path && !url.endsWith('/')) {
    url = url + '/';
  }
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  return url;
};

/** */
export const getPermalink = (slug = '', type = 'page', lang = ''): string => {
  if (slug.startsWith('#')) {
    return slug;
  }

  let permalink: string;

  if (
    slug.startsWith('https://') ||
    slug.startsWith('http://') ||
    slug.startsWith('://') ||
    slug.startsWith('javascript:')
  ) {
    return slug;
  }
  
  // Extract hash fragment if present
  let hashFragment = '';
  if (slug.includes('#')) {
    const parts = slug.split('#');
    slug = parts[0];
    hashFragment = '#' + parts[1];
  }

  switch (type) {
    case 'home':
      permalink = getHomePermalink(lang);
      break;

    case 'blog':
      permalink = getBlogPermalink(lang);
      break;

    case 'asset':
      permalink = getAsset(slug);
      break;

    case 'category':
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case 'tag':
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case 'post':
      permalink = createPath(trimSlash(slug));
      break;

    case 'page':
    default:
      permalink = createPath(slug);
      break;
  }

  // Append hash fragment after creating the permalink
  return definitivePermalink(permalink, lang) + hashFragment;
};

/** */
export const getHomePermalink = (lang = ''): string => getPermalink('/', 'page', lang);

/** */
export const getBlogPermalink = (lang = ''): string => getPermalink(BLOG_BASE, 'page', lang);

/** */
export const getAsset = (path: string): string =>
  '/' +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');

/** */
const definitivePermalink = (permalink: string, lang = ''): string => {
  // Don't add language prefix to hash-only links
  if (permalink.startsWith('#')) {
    return permalink;
  }
  
  // Don't add language prefix to external links
  if (permalink.startsWith('http://') || permalink.startsWith('https://') || permalink.startsWith('//')) {
    return permalink;
  }
  
  if (lang && ['en', 'nl', 'de', 'fr'].includes(lang)) {
    return createPath(BASE_PATHNAME, lang, permalink);
  }
  return createPath(BASE_PATHNAME, permalink);
};

/** */
export const applyGetPermalinks = (menu: object = {}) => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item));
  } else if (typeof menu === 'object' && menu !== null) {
    const obj = {};
    for (const key in menu) {
      if (key === 'href') {
        if (typeof menu[key] === 'string') {
          obj[key] = getPermalink(menu[key]);
        } else if (typeof menu[key] === 'object') {
          if (menu[key].type === 'home') {
            obj[key] = getHomePermalink();
          } else if (menu[key].type === 'blog') {
            obj[key] = getBlogPermalink();
          } else if (menu[key].type === 'asset') {
            obj[key] = getAsset(menu[key].url);
          } else if (menu[key].url) {
            obj[key] = getPermalink(menu[key].url, menu[key].type);
          }
        }
      } else {
        obj[key] = applyGetPermalinks(menu[key]);
      }
    }
    return obj;
  }
  return menu;
};
