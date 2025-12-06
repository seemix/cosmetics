import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";

export default function CartWindow() {
	return (
		<div className={"h-screen bg-background text-black"}>
			<h2 className={"text-xl text-black text-center font-bold my-5"}>
				Корзина
			</h2>
			<div
				className={"border-b border-gray-300 flex items-center gap-2 mx-4 my-2"}
			>
				<Image
					src={
						"https://barbercompany.com/image/cache/wp/gj/2024/12-24/nishman-beard-hair-milk-therapy-conditioner-400-ml-1000x1000.webp"
					}
					alt={"product"}
					width={80}
					height={80}
				/>
				<div>
					<p className={"text-black text-xs"}>
						{" "}
						Nishman Beard & Hair Milk Therapy Conditioner 400 мл
					</p>
					<p className={"text-center"}>590 MDL</p>
				</div>
				<div className={"flex gap-2 items-center border-1 border-gray-400"}>
					<button className={"rounded p-2 cursor-pointer text-lg"}>-</button>
					<p>222</p>
					<button className={"rounded p-2 cursor-pointer text-lg"}>+</button>
				</div>
				<div>
					<button className={"cursor-pointer"}>
						<MdDeleteOutline className={"w-8 sm:w-6 h-auto"} />
					</button>
				</div>
			</div>
			<div className={"border-b border-gray-300 flex items-center gap-2 mx-4"}>
				<Image
					src={
						"https://barbercompany.com/image/cache/wp/gj/Morgans%20/kondicioner-dlja-volos-morgans-mens-conditioner-1000-ml-1000x1000.webp"
					}
					alt={"product"}
					width={80}
					height={80}
				/>
				<div>
					<p className={"text-black text-xs"}>
						Кондиціонер для волосся Morgan`s Men`s Conditioner 1000 мл
					</p>
					<p className={"text-center"}>690 MDL</p>
				</div>
				<div className={"flex gap-2 items-center border-1 border-gray-400"}>
					<button className={"rounded p-2 cursor-pointer text-lg"}>-</button>
					<p>110</p>
					<button className={"rounded p-2 cursor-pointer text-lg"}>+</button>
				</div>
				<div>
					<button className={"cursor-pointer"}>
						<MdDeleteOutline className={"w-8 sm:w-6 h-auto"} />
					</button>
				</div>
			</div>
		</div>
	);
}
