import TextSkeleton from "./TextSkeleton";

export default function BannerWithInfoSkeleton() {
    return(
        <div className="flex items-center gap-3">
            <div className="w-[120px] aspect-video bg-secondary rounded-md" />
            <div className="flex flex-col gap-1">
                <TextSkeleton height={26} />
                <div className="flex flex-col gap-0.5">
                    <TextSkeleton height={16} width={350} />
                    <TextSkeleton height={16} width={150} />
                </div>
            </div>
        </div>
    )
}