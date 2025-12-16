import type { ProductGallery } from '@/app/[locale]/types/product';
import { assets } from '@/app/[locale]/assets/assets';

export default function FullScreenProductGallery({ images, index = 1 }: { images: ProductGallery[], index: number }) {
    const { backendUrl } = assets;
    return (
        // <div className={'w-vw h-screen p-5'}>
            <img src={backendUrl+images[index].image.url} alt="4444" width={800} height={800} className={'min-w-[800px]'}/>
        // </div>
    );
}