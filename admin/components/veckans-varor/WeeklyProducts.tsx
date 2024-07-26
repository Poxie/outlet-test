import { WeeklyProductGroup } from "@/utils/types";
import CurrentWeekProducts from "./CurrentWeekProducts";
import UpcomingWeekProducts from "./UpcomingWeekProducts";
import WithLoadingSkeleton from "../skeletons/WithLoadingSkeleton";
import WeeklyProductsSkeleton from "../skeletons/WeeklyProductsSkeleton";

function WeeklyProducts({ weeks, loading }: {
    weeks: WeeklyProductGroup[];
    loading: boolean;
}) {
    return(
        <>
            <CurrentWeekProducts 
                week={weeks[0]}
            />
            <UpcomingWeekProducts 
                weeks={weeks.slice(1)}
            />
        </>
    )
}

export default WithLoadingSkeleton(WeeklyProducts, WeeklyProductsSkeleton);