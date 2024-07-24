const REDIS_KEYS = {
    stores: 'stores',
    store: (id: string) => `store:${id}`,

    productGroups: (withProducts: boolean) => `productGroups:withProducts:${withProducts}`,
    productGroup: (id: string, withProducts: boolean) => `productGroup:${id}:withProducts:${withProducts}`,
    productGroupsByParentId: (parentId: string | null) => `productGroups:parentId:${parentId}`,
}
export default REDIS_KEYS;