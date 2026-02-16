import { OrderSuccessfullyCreated } from '@/app/[locale]/components';

export default function OrderCreatedPage() {
    return (
        <div>
            <h2 className={'text-center text-1xl'}>Order created successfully</h2>
            <OrderSuccessfullyCreated/>
        </div>
    );
}