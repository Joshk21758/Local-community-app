import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppLogo({ className }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <FileText className="h-6 w-6 text-primary" />
      <span className="font-headline text-lg font-bold">Civitas Hub</span>
    </div>
  );
}