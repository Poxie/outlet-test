import TextSkeleton from "./TextSkeleton";

export default function UserInfoSkeleton() {
    return(
        <div className="flex items-center gap-3">
            <div className="w-8 aspect-square rounded-full bg-secondary" />
            <TextSkeleton />
        </div>
    )
}