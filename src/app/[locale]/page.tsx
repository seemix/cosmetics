import Image from 'next/image';
import upperImage from './assets/uppercut_.webp';

export default async function Home() {
    return (
        <>
            <Image src={upperImage} alt="Приклад"
                // fill
                   className="object-cover"
                   priority/>
        </>
    );
}
