export type SearchParams = Record<string, string | string[] | undefined>;

/** Props of a page under `app/[locale]`; `P` adds the page's own dynamic segments. */
export type PageProps<P extends object = object> = {
	params: Promise<{ locale: string } & P>;
	searchParams: Promise<SearchParams>;
};

/** First value of a search param that may be repeated in the URL. */
export function firstParam(value: string | string[] | undefined) {
	return Array.isArray(value) ? value[0] : value;
}
