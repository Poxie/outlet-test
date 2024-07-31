export const PRODUCT_GROUP_TYPE = {
    PRODUCT_GROUP: 'PRODUCT_GROUP',
    WEEKLY_PRODUCT: 'WEEKLY_PRODUCT',
    BLOG: 'BLOG',
} as const;

export const IncludeGroupProps = (args?: {
    products?: boolean;
    productCount?: boolean;
}) => {
    const { products, productCount=true } = args ?? {};
    return {
        include: {
            products,
            _count: {
                select: {
                    products: productCount,
                },
            },
        },
    }
}