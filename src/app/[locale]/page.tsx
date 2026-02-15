import { PostsSlider } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';

export default async function HomePage() {
    const { backendUrl } = assets;
    const posts = await fetch(`${backendUrl}/api/posts`).then(res => res.json());

    return <PostsSlider slides={posts.docs}/>;
}
