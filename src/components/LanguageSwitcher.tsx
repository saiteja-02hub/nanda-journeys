import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { isLanguage, languages } from "@/config/translations";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  return <DropdownMenu><DropdownMenuTrigger asChild><Button variant="travelOutline" size="icon" className="size-11 shrink-0 border-transparent" aria-label="Change language / భాష / भाषा" title="Change language"><Languages className="size-5" /></Button></DropdownMenuTrigger><DropdownMenuContent align="end" className="z-[70] min-w-40"><DropdownMenuRadioGroup value={language} onValueChange={value => { if (isLanguage(value)) setLanguage(value); }}>{languages.map(item => <DropdownMenuRadioItem key={item.code} value={item.code} lang={item.code} className="min-h-11">{item.label}</DropdownMenuRadioItem>)}</DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu>;
}