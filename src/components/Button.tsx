import { forwardRef, HtmlHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled = false, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled}
        className={clsx(
          'flex px-4 py-2 rounded-lg bg-white border border-slate-200 transition-colors',
          'hover:bg-slate-100',
          disabled &&
            'cursor-no-drop bg-slate-200 hover:bg-slate-200 text-slate-500',
          className
        )}
      >
        {children}
      </button>
    );
  }
);

export default Button;
