import { Logo } from '@/app/[locale]/components';

export default function HeaderLogo() {
  return (
    <div className={'w-full flex sm:hidden p-2 bg-foreground justify-center'}>
      <Logo/>
    </div>
  );
}