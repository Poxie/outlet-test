import useQueryWeeklyDealByDate from "@/hooks/weekly-deals/useQueryWeeklyDealByDate";
import ModalHeader from "../ModalHeader";
import { getWeekText } from "@/utils";
import WeeklyProductGrid from "./WeeklyProductsGrid";

export default function WeeklyProductsModal({ date }: {
    date: string;
}) {
    const { data: week, isPending } = useQueryWeeklyDealByDate(date);

    return(
        <>
        <ModalHeader 
            title={getWeekText(date)}
        />
        <WeeklyProductGrid 
            date={date}
            products={week?.group.products || []}
            loading={isPending}
        />
        </>
    )
}