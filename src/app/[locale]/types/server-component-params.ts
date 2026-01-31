export type propsType = {
    params: Promise<{ locale: string, slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
