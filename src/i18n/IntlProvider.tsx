import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import en from './messages/en';
import uz from './messages/uz';
import ru from './messages/ru';

const messages = { en, uz, ru };

interface Props {
  children: React.ReactNode;
}

export function IntlProvider({ children }: Props) {
  const [locale, setLocale] = React.useState(localStorage.getItem('locale') || 'en');

  React.useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <ReactIntlProvider messages={messages[locale as keyof typeof messages]} locale={locale}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { locale, onLocaleChange: setLocale });
        }
        return child;
      })}
    </ReactIntlProvider>
  );
}