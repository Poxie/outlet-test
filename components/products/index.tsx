// These would be dynamically fetch from the API
import categories from '@/assets/json/categories.json';
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import HomeProductBanner from '../home/products/HomeProductBanner';

export default function Products({ params: { categoryId } }: {
    params: { categoryId: string };
}) {
    const category = categories.find(category => category.categoryId === categoryId);
    if(!category) return <div>Category not found</div>;

    const { title, description, banner, products } = category;
    return(
        <main>
            <HomeProductBanner 
                className="main-width"
                categoryId={categoryId}
                origin={{ href: '/products', title: 'produkter' }}
            />
            <div className="pb-8 main-width">
                <ProductHeader 
                    categoryId={categoryId}
                    title={title}
                    description={description}
                    image={`/images/products/${categoryId}/${banner}`}
                />
                <ProductList 
                    images={products.map(imageId => `/images/products/${categoryId}/${imageId}.png`)}
                    className="mt-4"
                />
            </div>
            <SicklaNotice />
        </main>
    )
}