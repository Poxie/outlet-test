import InstagramIcon from "@/icons/InstagramIcon";

const ACCOUNTS = ['Länna', 'Bernstorp', 'Västerås', 'Uppsala', 'Sickla', 'Uddevalla', 'Örebro', 'Center Syd', 'Eskilstuna', 'Södertälje', 'Norrköping', 'Sundsvall', 'Växjö', 'Väla', 'Kristianstad'];

export default function HomeAllInstagrams() {
    return(
        <div>
            <h2 className="mt-8 mb-4 text-xl">
                Följ din lokala Outlet
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {ACCOUNTS.map(account => {
                    const accountId = account
                        .toLowerCase()
                        .replaceAll(' ', '')
                        .replaceAll('å', 'a')
                        .replaceAll('ä', 'a')
                        .replaceAll('ö', 'o');

                    const accountLink = `https://www.instagram.com/ahlensoutlet.${accountId}/`;
                    return(
                        <li key={account}>
                            <a 
                                className="px-3 py-2.5 flex gap-2 items-center border-[1px] border-tertiary rounded-md hover:text-c-primary hover:bg-secondary transition-colors"
                                href={accountLink} 
                                target="_blank"
                            >
                                <InstagramIcon className="text-c-primary" size={18} />
                                {account}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}