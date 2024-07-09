export default function Modal({ children }: {
    children: React.ReactNode;
}) {
    return(
        <div className="w-modal z-10 absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 max-w-full bg-primary rounded-md">
            {children}
        </div>
    )
}