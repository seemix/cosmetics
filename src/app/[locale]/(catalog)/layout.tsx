export default async function CatalogLayout({ children, params }: {
    children: React.ReactNode,
    params: Promise<{ locale: string }>;
}) {

    return (
        <div className={'w-full flex justify-center'}>
            <div className={'grid'}>
                {children}
            </div>
        </div>
    );
}