import { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, placeholder = 'Enter your text here', ...props }, ref) => {
    return (
      <textarea
        {...props}
        ref={ref}
        placeholder={placeholder}
        className={clsx(
          'w-full h-full resize-none bg-slate-50 outline-none text-2xl overflow-y-auto',
          className
        )}
      />
    );
  }
);

export default TextArea;
