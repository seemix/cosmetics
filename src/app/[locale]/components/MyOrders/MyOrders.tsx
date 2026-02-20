'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

import type { IOrder } from '@/app/[locale]/types/order';
import { SingleOrderItem } from '@/app/[locale]/components';
import { assets } from '@/app/[locale]/assets/assets';

export default function MyOrders({ orders }: { orders: IOrder[] }) {
    const [openIds, setOpenIds] = useState<string[]>([]);
    const t = useTranslations('Checkout');

    const toggle = (id: string) => {
        setOpenIds((prev) =>
            prev.includes(id)
                ? prev.filter((openId) => openId !== id)
                : [...prev, id]
        );
    };

    const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
        minute: '2-digit',
        hour: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className={'w-full md:w-2xl max-w-[95%] mx-auto space-y-2 my-2'}>
            {orders.map((order) => (
                <div key={order.id} className={'border p-2 border-gray-200 overflow-hidden'}>
                    <button
                        type={'button'}
                        onClick={() => toggle(order.id)}
                        className={`w-full flex justify-between items-center p-4 hover:bg-gray-50 
                                    transition-colors text-left cursor-pointer bg-gray-50`}>
                        <div className={'flex justify-between w-full mr-2'}>
                            <div>📃 <small>#{order.orderNumber}</small></div>
                            <div className={'text-gray-400'}>
                                📅 <small>{dateFormatter.format(new Date(order.createdAt))}</small>
                            </div>
                            <div className={'text-sm'}>{t('sum')} {order.total} MDL</div>
                        </div>
                        <motion.div
                            animate={{ rotate: openIds.includes(order.id) ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MdOutlineKeyboardArrowDown className={'w-5 h-5 text-gray-500'}/>
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {openIds.includes(order.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <table className={'w-full text-left border-collapse text-sm text-black'}
                                       cellSpacing={1}>
                                    <thead>
                                    <tr className={'border-b-1 border-gray-500'}>
                                        <th className={'py-2 pr-2 w-8'}>№</th>
                                        <th className={'py-2'}>{t('product')}</th>
                                        <th className={'py-2 text-center w-15'}>{t('qty')}</th>
                                        <th className={'py-2 text-right w-10'}>{t('price')}</th>
                                        <th className={'py-2 text-right w-15'}>{t('sum')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {order.items.map((item, index) =>
                                        <SingleOrderItem item={item} index={index} key={item.id}/>)}
                                    </tbody>
                                    <tfoot>
                                    <tr className={'font-bold text-base'}>
                                        <td colSpan={2}
                                            className={'py-4 text-right uppercase pt-4 border-t'}>{t('total')}</td>
                                        <td colSpan={3}
                                            className={'py-4 text-right pt-4 text-center border-t'}>
                                            {order.total} {assets.currency}
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}