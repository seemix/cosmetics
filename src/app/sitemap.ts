// import type { MetadataRoute } from 'next'
//
// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//     const products = await getAllProducts()
//
//     const productEntries = products.map((p) => ({
//         url: `https://nextlevelshop.md/products/${p.slug}`,
//         lastModified: p.updatedAt,
//         priority: 0.7,
//     }))
//
//     return [
//         { url: 'https://nextlevelshop.md', lastModified: new Date(), priority: 1.0 },
//         { url: 'https://nextlevelshop.md/categories', lastModified: new Date(), priority: 0.8 },
//         ...productEntries,
//     ]
// }