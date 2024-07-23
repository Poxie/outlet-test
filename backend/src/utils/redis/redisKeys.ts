const REDIS_KEYS = {
    stores: 'stores',
    store: (id: string) => `store:${id}`,
}
export default REDIS_KEYS;