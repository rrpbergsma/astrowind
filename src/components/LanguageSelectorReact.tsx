import { useState } from 'react';
import type { ComponentProps } from 'react';
import { Icon as IconComponent } from 'astro-icon/components';

// Create a wrapper component for Icon with proper TypeScript types
const Icon = ({ className, ...props }: ComponentProps<typeof IconComponent> & { className?: string }) => {
  return <IconComponent {...props} class={className} />;
};

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: 'gb' },
  { code: 'nl', name: 'Dutch', flag: 'nl' },
  { code: 'de', name: 'German', flag: 'de' },
];

interface LanguageSelectorProps {
  defaultLang: string;
}

export default function LanguageSelectorComponent({ defaultLang }: LanguageSelectorProps) {
  const [currentLang] = useState<string>(defaultLang);

  const handleLanguageSelect = (code: string) => {
    if (code !== currentLang) {
      window.location.href = `/${code}`;
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className={`
            inline-flex items-center px-3 py-2 text-sm font-medium rounded-md
            transition-colors duration-200 hover:bg-gray-100
            ${language.code === currentLang 
              ? 'text-blue-600 bg-blue-50' 
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
          aria-current={language.code === currentLang ? 'page' : undefined}
        >
          <Icon 
            name={`circle-flags:${language.flag}`} 
            className="w-5 h-5 mr-2" 
            aria-hidden="true" 
          />
          <span>{language.name}</span>
        </button>
      ))}
    </div>
  );
}