export default function Modal({ children }: {
    children: React.ReactNode;
}) {
    return(
        <div className="z-10 relative max-w-full bg-primary rounded-md">
            {children}
        </div>
    )
}