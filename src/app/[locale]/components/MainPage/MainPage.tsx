import Image from 'next/image';
import upperImage from '@/app/[locale]/assets/uppercut_.webp';

export default function MainPage() {
  return (
      <>
          <Image
              src={upperImage}
              alt="Приклад"
              // fill
              className="object-cover"
              priority
          />
      </>
  );
}