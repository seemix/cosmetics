"use client";

import { catalogMenuData } from "@/app/[locale]/components/CatalogMenu/catalogMenuData";
import MenuItem from "@/app/[locale]/components/CatalogMenu/MenuItem";
import { useState } from "react";

export default function CatalogMenu() {
	const [openItem, setOpenItem] = useState<string | null>(null);
	return (
		<nav
			className={`container mx-auto flex flex-col md:flex-row justify-center gap-y-5 sm:gap-y-0 gap-x-3 
            sm:gap-x-3 lg:gap-x-10 mt-10 sm:mt-0 text-black`}
		>
			{catalogMenuData.map((item) => (
				<MenuItem
					openItem={openItem}
					setOpenItem={setOpenItem}
					key={item.name}
					item={item}
				/>
			))}
		</nav>
	);
}
