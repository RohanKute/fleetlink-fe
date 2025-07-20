import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, Props>(({ label, error, ...rest }, ref) => (
  <div>
    <label className="block text-sm font-medium text-gray-600">{label}</label>
    <input
      ref={ref}
      {...rest}
      className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
));

export default FormInput