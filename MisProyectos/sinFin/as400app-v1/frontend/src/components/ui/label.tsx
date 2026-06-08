import * as React from 'react';
import { cn } from '@/components/lib/cn';
export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...p }, ref) => (
    <label ref={ref} className={cn('text-sm font-medium leading-none', className)} {...p} />
  ),
);
Label.displayName = 'Label';
