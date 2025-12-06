import { ProductCard } from "@/app/[locale]/components";

export default function ProductPage() {
	const product = {
		id: 1,
		name: "Бальзам Після Гоління Truefitt & Hill Grafton Aftershave Balm 100 мл",
		price: 680,
		image:
			"https://barbercompany.com/image/cache/wp/gj/Truefitt/balzam-posle-brytya-truefitt-hill-grafton-aftershave-balm-100-ml-660x660.webp",
		alt: "alt2",
	};
	return (
		<div>
			<h2 className={"text-black text 2xl bold my-5"}>Product page</h2>
			<div className={"grid grid-cols-[1fr_1fr_1fr] gap-3"}>
				<ProductCard product={product} />
				<ProductCard product={product} />
				<ProductCard product={product} />
				<ProductCard product={product} />
				<ProductCard product={product} />
			</div>
		</div>
	);
}
