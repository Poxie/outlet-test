const PRODUCT_COUNT = 6;
export default function ProductGroupProductsSkeleton() {
    return(
        <div className="p-4 grid grid-cols-3 gap-2">
            {Array.from({ length: PRODUCT_COUNT }).map((_, index) => (
                <div className="w-[145px] aspect-square rounded-md bg-secondary" key={index} />
            ))}
        </div>
    )
}