import { assets } from '@/app/[locale]/assets/assets';
import type { FormFieldProps } from '@/app/[locale]/types/form-input';

export default function FormPhoneInput({ label, error, register }: FormFieldProps) {
    const { phoneCode } = assets;
    return (
        <div>
            <label htmlFor={'phone'} className={'block text-xs font-medium'}>
                {label}
            </label>
            <div className={`flex items-center border border-gray-300 mt-1 focus-within:ring-1 focus-within:ring-black 
                             ${error ? 'border-red-500 focus-within:ring-red-500' : ''}`}>
                <span className={'ml-2 text-sm text-gray-700'}>{phoneCode}</span>
                <input
                    id={'phone'}
                    type={'tel'}
                    inputMode={'numeric'}
                    {...register}
                    className={'w-full px-1 py-2 focus:outline-none text-sm'}
                />
            </div>
            <div className={'h-5'}>
                {error && <p className={'mt-1 text-xs text-red-600'}>{error.message}</p>}
            </div>
        </div>
    );
}