import TextSkeleton from "./TextSkeleton";

export default function UserInfoSkeleton() {
    return(
        <div className="flex items-start gap-3">
            <div className="w-8 aspect-square rounded-full bg-secondary" />
            <div className="grid gap-0.5">
                <TextSkeleton />
                <TextSkeleton width={100} height={16} />
            </div>
        </div>
    )
}