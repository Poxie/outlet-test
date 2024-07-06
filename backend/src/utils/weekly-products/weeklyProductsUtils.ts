import WeeklyProductQueries from "./weeklyProductQueries";
import { WEEKLY_PRODUCT_ID_LENGTH } from "./weeklyProductsConstants";

export default class WeeklyProductsUtils {
    static getUpcomingWeeks() {
        const upcomingWeeks: {
            date: string;
            week: number;
        }[] = [];

        // Get the next 4 weeks, start from 1 to skip the current week
        for(let i = 1; i < 5; i++) {
            const date = new Date(this.getCurrentWeek());
            date.setDate(date.getDate() + 7 * i);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const dayOfMonth = date.getDate().toString().padStart(2, '0');

            const dateString = `${year}-${month}-${dayOfMonth}`;

            upcomingWeeks.push({
                date: dateString,
                week: this.getWeekNumber(date),
            });
        }

        return upcomingWeeks;
    }

    static getWeekNumber(date: Date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    }

    static getCurrentWeek() {
        const date = new Date();
        // Get the day of the week, converting Sunday (number 0) to number 7, i.e. Monday is 1, Tuesday is 2, etc.
        const day = date.getDay() || 7;

        if(day !== 1) {
            // If the day is not Monday, subtract the number of days that have passed since Monday
            date.setHours(-24 * (day - 1));
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const dayOfMonth = date.getDate().toString().padStart(2, '0');

        const dateString = `${year}-${month}-${dayOfMonth}`;

        return dateString;
    }

    static isDealDate(dateString: string) {
        const date = new Date(dateString);
        const day = date.getDay();

        return day === 1;
    }

    static async generateWeeklyProductId(): Promise<string> {
        const mathOffset = 2;
        const id = Math.random().toString().slice(mathOffset, WEEKLY_PRODUCT_ID_LENGTH + mathOffset);

        // Check if the id already exists
        if(await WeeklyProductQueries.getWeeklyProductById(id)) {
            return this.generateWeeklyProductId();
        }

        return id;
    }
}