// These would be dynamically fetch from the API
import categories from '@/assets/json/categories.json';
import ProductHeader from './ProductHeader';

export default function Products({ params: { categoryId } }: {
    params: { categoryId: string };
}) {
    const category = categories.find(category => category.categoryId === categoryId);
    if(!category) return <div>Category not found</div>;

    const { title, description, banner, products } = category;
    return(
        <main>
            <div className="py-8 main-width">
                <ProductHeader 
                    categoryId={categoryId}
                    title={title}
                    description={description}
                    image={banner}
                />
            </div>
        </main>
    )
}