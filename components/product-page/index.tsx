// These would be dynamically fetch from the API
import categories from '@/assets/json/categories.json';
import ProductHeader from './ProductHeader';
import ProductList from './ProductList';
import SicklaNotice from '../sickla-notice';
import PageBanner from '../page-banner';

export default function Products({ params: { categoryId } }: {
    params: { categoryId: string };
}) {
    const category = categories.find(category => category.categoryId === categoryId);
    if(!category) return <div>Category not found</div>;

    const { title, description, banner, products } = category;
    return(
        <main>
            <PageBanner 
                className="main-width"
                steps={[
                    { text: 'Start', path: '/' },
                    { text: 'Produkter', path: '/produkter' },
                    { text: category.title, path: `/produkter/${category.title.toLowerCase()}` },
                ]}
            />
            <div className="pb-8 main-width">
                <ProductHeader 
                    categoryId={categoryId}
                    title={title}
                    description={description}
                    image={`/images/products/${categoryId}/${banner}`}
                />
                <ProductList 
                    products={products}
                    className="mt-4"
                />
            </div>
            <SicklaNotice />
        </main>
    )
}