import PageBanner from "../page-banner";
import CurrentWeekProducts from "./CurrentWeekProducts";
import UpcomingWeekProducts from "./UpcomingWeekProducts";

export default function VeckansVaror() {
    return(
        <main>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Veckans varor', href: '/veckans-varor' },
                ]}
            />
            <div className="p-5">
                <CurrentWeekProducts />
                <UpcomingWeekProducts />
            </div>
        </main>
    )
}