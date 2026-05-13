import { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { cn } from './ui/utils';

const cmsContentClassName =
  'max-w-full break-words text-gray-600 ' +
  '[&_a]:font-semibold [&_a]:text-[#1E3A8A] [&_a]:underline [&_a]:underline-offset-2 ' +
  '[&_br]:block [&_p]:my-0 [&_p+p]:mt-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5 ' +
  '[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 ' +
  '[&_strong]:font-bold [&_em]:italic';

export function SafeHtml({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  const sanitizedHtml = useMemo(() => DOMPurify.sanitize(html), [html]);

  return (
    <div
      className={cn(cmsContentClassName, className)}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
