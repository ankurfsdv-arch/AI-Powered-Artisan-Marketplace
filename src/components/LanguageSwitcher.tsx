import { Languages } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage, Language } from './LanguageContext';

const languageNames = {
  en: 'English',
  hi: 'हिंदी'
};

const languageFlags = {
  en: '🇺🇸',
  hi: '🇮🇳'
};

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-white hover:bg-white/10"
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('header.language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
        {Object.entries(languageNames).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code as Language)}
            className={`cursor-pointer text-white hover:bg-gray-800 ${
              currentLanguage === code ? 'bg-gray-800' : ''
            }`}
          >
            <span className="mr-2">{languageFlags[code as Language]}</span>
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}