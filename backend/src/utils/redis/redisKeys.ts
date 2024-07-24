const REDIS_KEYS = {
    productList: 'productList',
    productPage: (id: string) => `productPage:${id}`,

    stores: 'stores',
    store: (id: string) => `store:${id}`,

    productGroups: (withProducts: boolean) => `productGroups:withProducts:${withProducts}`,
    productGroup: (id: string, withProducts: boolean) => `productGroup:${id}:withProducts:${withProducts}`,
    productGroupsByParentId: (parentId: string | null) => `productGroups:parentId:${parentId}`,
}
export default REDIS_KEYS;