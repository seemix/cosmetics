import type { FormFieldProps } from '@/app/[locale]/types/form-input';

export default function FormInput({ label, error, register, type = 'text', readOnly, id }: FormFieldProps) {
    return (
        <div>
            <label htmlFor={id} className={'block text-xs font-medium tracking-wider'}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                readOnly={readOnly}
                {...register}
                className={`mt-1 w-full border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 
                            focus:ring-black text-sm transition-all
                            ${readOnly ? 'bg-gray-100 cursor-default' : 'focus:ring-1 focus:ring-black'}
                            ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            <div className={'h-5'}>
                {error && <p className={'mt-1 text-xs text-red-600'}>{error.message}</p>}
            </div>
        </div>
    );
}