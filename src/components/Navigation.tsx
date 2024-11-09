import React from 'react';
import { Menu } from 'lucide-react';
import { useIntl } from 'react-intl';
import { LanguageSwitch } from './LanguageSwitch';

interface Props {
  activeTab: 'employees' | 'salaries' | 'api' | 'docs';
  onTabChange: (tab: 'employees' | 'salaries' | 'api' | 'docs') => void;
  locale: string;
  onLocaleChange: (locale: string) => void;
}

export function Navigation({ activeTab, onTabChange, locale, onLocaleChange }: Props) {
  const intl = useIntl();

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-lg font-semibold">
              {intl.formatMessage({ id: 'app.title' })}
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="flex space-x-4">
              {['employees', 'salaries', 'api', 'docs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => onTabChange(tab as 'employees' | 'salaries' | 'api' | 'docs')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500'
                  }`}
                >
                  {intl.formatMessage({ id: `nav.${tab}` })}
                </button>
              ))}
            </div>
            <LanguageSwitch
              currentLocale={locale}
              onLocaleChange={onLocaleChange}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}