import PageBanner from "../page-banner";

export default function VeckansVaror() {
    return(
        <main>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Veckans varor', href: '/veckans-varor' },
                ]}
            />
        </main>
    )
}