import React from 'react';
import { Globe } from 'lucide-react';
import { useIntl } from 'react-intl';

interface LanguageSwitchProps {
  currentLocale: string;
  onLocaleChange: (locale: string) => void;
}

export function LanguageSwitch({ currentLocale, onLocaleChange }: LanguageSwitchProps) {
  const intl = useIntl();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'uz', name: 'O\'zbekcha' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-5 w-5 text-gray-100" />
      <select
        value={currentLocale}
        onChange={(e) => onLocaleChange(e.target.value)}
        className="bg-indigo-700 text-white border-none rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-indigo-500"
      >
        {languages.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}