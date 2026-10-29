export type IBreadcrumb = {
	id: string;
	title: string;
	/** Locale-less path; the crumb is plain text without it. */
	href?: string;
};
