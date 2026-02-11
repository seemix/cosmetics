import { CheckoutForm, Invoice } from '@/app/[locale]/components';

export default function CheckoutPage() {
    return (
        <div className={'max-w-[1100px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4'}>
            <Invoice/>
            <CheckoutForm/>
        </div>
    );
}