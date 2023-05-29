'use client';

import { useRef, useState } from 'react';
import {
  FileCode,
  FileCss,
  FileHtml,
  FileJs,
  FileJsx,
  FileText,
  FileTs,
  FileTsx,
  TerminalWindow,
  Check,
  Copy
} from './icons';
import clsx from 'classnames';

export interface CopyButtonProps {
  className?: string;
  elementRef: React.RefObject<HTMLElement>;
}

export function CopyButton({ className, elementRef, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !elementRef.current) return;
    const text = elementRef.current.innerText;
    void window.navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <button
      className={clsx(
        'h-8 w-8 cursor-pointer rounded-md text-primary-600 ring-1 ring-inset ring-gray-500/20 backdrop-blur-md transition-colors hover:bg-gray-100 hover:text-primary-500 dark:hover:bg-gray-800',
        className
      )}
      aria-label='Copy to Clipboard'
      title='Copy to Clipboard'
      onClick={copyToClipboard}
      {...props}>
      <div className='relative h-full w-full p-1'>
        <Copy
          className={clsx('absolute transition-transform', isCopied ? 'scale-0' : 'scale-100')}
          width={24}
          height={24}
        />
        <Check
          className={clsx('absolute transition-transform', isCopied ? 'scale-100' : 'scale-0')}
          width={24}
          height={24}
        />
      </div>
    </button>
  );
}
export type CodeblockProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  /** set by `rehype-pretty-code` */
  'data-language'?: string;
  /** set by `rehype-pretty-code` */
  'data-theme'?: string;
};

export function Codeblock({ children, ...props }: CodeblockProps) {
  const language = props['data-language'];
  const theme = props['data-theme'];
  const LanguageIcon = getIconForLanguage(language);
  const ref = useRef<HTMLPreElement>(null);

  return (
    <>
      <LanguageIcon
        className='text-foreground absolute left-4 top-[13px] hidden'
        aria-hidden={true}
        data-language-icon
        data-theme={theme}
        width={20}
        height={20}
      />

      <pre ref={ref} {...props}>
        {children}
      </pre>

      <CopyButton
        className='absolute right-2.5 top-[9px] opacity-0 transition-opacity focus:opacity-100 lg:right-[13px] lg:top-[13px] [[data-rehype-pretty-code-title]~&]:right-[9px] [[data-rehype-pretty-code-title]~&]:top-[7px] [div:hover>&]:opacity-100'
        elementRef={ref}
        data-theme={theme}
      />
    </>
  );
}

function getIconForLanguage(language: string | undefined) {
  switch (language) {
    case 'html':
      return FileHtml;
    case 'css':
      return FileCss;
    case 'js':
      return FileJs;
    case 'jsx':
      return FileJsx;
    case 'ts':
      return FileTs;
    case 'tsx':
      return FileTsx;
    case 'bash':
    case 'sh':
      return TerminalWindow;
    case 'md':
    case 'mdx':
      return FileText;
    default:
      return FileCode;
  }
}
