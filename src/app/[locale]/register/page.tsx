import { BreadCrumbs, RegisterForm } from '@/app/[locale]/components';
import { getTranslations } from 'next-intl/server';

export default async function Register() {
    const t = await getTranslations();
    const breadCrumbs = [
        { id: '0', title: t('StaticPages.Main'), slug: 'account' },
        { id: '1', title: t('RegisterForm.newUserRegistration'), slug: 'register' }
    ];
    return (<div className={'max-w-[1000px] w-full lg:w-[1100px] mx-auto flex flex-col gap-4 px-3'}>

    <BreadCrumbs breadcrumbs={breadCrumbs}/>
        <RegisterForm/>
    </div>);
}
