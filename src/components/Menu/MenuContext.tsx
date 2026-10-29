'use client';

import { createContext, useContext } from 'react';
import type { MenuData } from '@/types/api';

const MenuContext = createContext<MenuData | null>(null);

export function useMenu() {
	const ctx = useContext(MenuContext);
	if (!ctx) {
		throw new Error('useMenu must be used inside MenuProvider');
	}
	return ctx;
}

export function MenuProvider({
	children,
	initialMenu,
}: {
	children: React.ReactNode;
	initialMenu: MenuData;
}) {
	return (
		<MenuContext.Provider value={initialMenu}>{children}</MenuContext.Provider>
	);
}
