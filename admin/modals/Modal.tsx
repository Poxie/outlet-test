export default function Modal({ children }: {
    children: React.ReactNode;
}) {
    return(
        <div className="z-10 relative max-h-[80vh] max-w-full bg-primary rounded-md overflow-auto">
            {children}
        </div>
    )
}