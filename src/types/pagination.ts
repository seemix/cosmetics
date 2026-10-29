export type PaginationProps = {
    page: number;
    limit: number;
    totalPages: number;
    totalDocs: number;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
}