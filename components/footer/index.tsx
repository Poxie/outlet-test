import Image from "next/image";
import Link from "next/link";

const SECTIONS = [
    { title: 'Hjälp & Information', items: [
        { text: 'Kontakta oss', path: '/kontakta-oss' },
        { text: 'Våra varuhus', path: '/vara-varuhus' },
        { text: 'Köpvillkor', path: '/kopvillkor' },
    ]},
    { title: 'Tjänster', items: [
        { text: 'Presentkort', path: '/presentkort' },
        { text: 'Mina favoriter', path: '/favoriter' },
        { text: 'Inspiration', path: '/inspiration' },
    ]},
    { title: 'Åhléns Outlet', items: [
        { text: 'Om Åhléns Outlet', path: '/om-oss' },
        { text: 'Jobba hos oss', path: '/jobba-hos-oss' },
        { text: 'Hållbarhet', path: '/Hållbarhet' },
    ]}
]

export default function Footer() {
    return(
        <footer className="p-section bg-c-primary-accent">
            <div className="main-width flex justify-between gap-8 flex-wrap md:flex-nowrap">
                <div className="mb-4 md:mb-0 w-full md:w-[240px] grid gap-2 justify-center">
                    <Image 
                        className="mx-auto md:mx-0"
                        src="/images/logo-light.png"
                        width={230}
                        height={40}
                        alt="Logo"
                    />
                    <span className="text-lg text-light font-medium">
                        30 - 70% rabatt på kända varumärken.
                    </span>
                </div>
                {SECTIONS.map(section => (
                    <div 
                        className="text-light"
                        key={section.title}
                    >
                        <span className="font-semibold">
                            {section.title}
                        </span>
                        <ul className="mt-3 grid gap-1">
                            {section.items.map(item => (
                                <li key={item.text}>
                                    <Link href={item.path}>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </footer>
    )
}