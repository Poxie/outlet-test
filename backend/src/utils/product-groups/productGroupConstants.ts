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