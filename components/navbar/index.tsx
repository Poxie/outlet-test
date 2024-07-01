import HeartIcon from "@/icons/HeartIcon"
import Image from "next/image"
import Link from "next/link"

const NAVBAR_TABS = [
    { text: 'Startsida', path: '/' },
    { text: 'Våra varuhus', path: '/vara-varuhus' },
    { text: 'Inspiration', path: '/inspiration' },
    { text: 'Info', path: '/info' },
]
export default function Navbar() {
    return(
        <header>
            <div className="main-width py-5 grid items-center grid-cols-8">
                <div className="flex col-span-2">
                    <Link 
                        href="/"
                        aria-label="Hem"
                    >
                        <Image 
                            src="/images/logo.png"
                            width={216}
                            height={32}
                            alt="logo"
                        />
                    </Link>
                </div>
                <nav className="col-span-4">
                    <ul className="flex justify-center gap-4">
                        {NAVBAR_TABS.map(tab => (
                            <li>
                                <Link href={tab.path}>
                                    {tab.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex justify-end col-span-2">
                    <button 
                        className="flex items-center gap-2"
                        aria-label="Favoriter"
                    >
                        <HeartIcon size={24} />
                        Favoriter
                    </button>
                </div>
            </div>
        </header>
    )
}