import { propsType } from '@/app/[locale]/types/server-component-params';
import { assets } from '@/app/[locale]/assets/assets';
import { NoContent, StaticPage } from '@/app/[locale]/components';

export default async function AboutUsPage(props: propsType) {
    const { slug, locale } = await props.params;
    const { backendUrl } = assets;

    const url = new URL(`${backendUrl}/api/pages/${slug}`);
    url.search = new URLSearchParams({
        locale,
    }).toString();
    const { title, content } = await fetch(url).then(res => res.json());
    return (
        <>
            {!content ? <NoContent/> : <StaticPage content={content} title={title}/>}
        </>
    );
}
