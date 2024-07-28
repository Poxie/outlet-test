export default function Modal({ children }: {
    children: React.ReactNode;
}) {
    return(
        <div className="bg-primary rounded-md overflow-hidden">
            {children}
        </div>
    )
}