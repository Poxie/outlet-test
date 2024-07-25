export default function TextSkeleton({ width=120, height=22 }) {
    return(
        <div
            className="bg-secondary rounded-md"
            style={{ width, height }}
        />
    )
}