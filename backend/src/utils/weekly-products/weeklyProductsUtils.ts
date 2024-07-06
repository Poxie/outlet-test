import WeeklyProductQueries from "./weeklyProductQueries";
import { WEEKLY_PRODUCT_ID_LENGTH } from "./weeklyProductsConstants";

export default class WeeklyProductsUtils {
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