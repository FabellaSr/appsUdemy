import { Inbox } from 'lucide-react';
export const EmptyState = ({ title = 'Sin resultados', description = '' }: { title?: string; description?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <Inbox className="h-10 w-10 text-muted-foreground" />
    <h3 className="mt-4 text-base font-semibold">{title}</h3>
    {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
  </div>
);
