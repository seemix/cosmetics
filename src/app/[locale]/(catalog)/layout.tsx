export default async function CatalogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={"w-full flex justify-center"}>
			<div className={"grid"}>{children}</div>
		</div>
	);
}
