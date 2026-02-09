import { CheckoutForm, Invoice } from '@/app/[locale]/components';

export default function CheckoutPage() {
    return (
        <div className={'max-w-[1100px] mx-auto] flex flex-col-reverse md:flex-row gap-4'}>
            <CheckoutForm/>
            <div>
                <Invoice/>
            </div>
        </div>
    );
}