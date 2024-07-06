export const getCurrentDealDateString = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day == 0 ? -6 : 1);
    const dealDate = new Date(today.setDate(diff));
    return dealDate.toISOString().split('T')[0];
}