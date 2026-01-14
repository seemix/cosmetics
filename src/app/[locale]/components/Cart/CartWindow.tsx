import { CartItem, CloseModalButton } from '@/app/[locale]/components';

export default function CartWindow() {
    const products = [
        {
            id: '692dadc51e3b32b700a79163',
            title: 'Clay 70g',
            subtitle: 'Așezarea argilei',
            slug: 'clay-70g',
            price: 120,
            quantity: 2,
            thumbnail: '/api/media/file/FUllSize_Travel-CC-1-96x96.webp'
        },
        {
            id: '69389115f3dcee46ed8433b9',
            title: 'DAILY SHAMPOO',
            subtitle: 'ȘAMPON ZILNIC 400 ML',
            slug: 'daily-shampoo',
            price: 320,
            quantity: 1,
            thumbnail: '/api/media/file/ds1-1-96x96.webp'
        }
    ];

    return (
        <div className={'h-full bg-background text-black flex flex-col max-w-125'}>
            <div className={'shrink-0'}>
                <CloseModalButton />
                <h2 className={'text-xl text-center font-bold py-2'}>
                    Корзина
                </h2>
            </div>

            {/* SCROLL AREA */}
            <div className={'flex-1 overflow-hidden'}>
                <div className={'h-full overflow-y-auto p-4 border'}>
                    {products.map(product => (
                        <CartItem key={product.id} product={product} />
                    ))}
                    <div className={'h-[200vh] bg-gray-100 mt-4'}>
                        Довгий контент
                    </div>
                </div>
            </div>

            <div className={'shrink-0 border-t p-4'}>
                <button
                    type={'button'}
                    className={`w-full border border-black p-2 transition-colors hover:border-[var(--main)] 
                                hover:text-[var(--main)]`}
                >
                    Checkout
                </button>
            </div>
        </div>
    );
}
