export function calculateDeadline(deadline) {
    let timeLeft = '';
    const today = new Date();
    const deadlineDate = new Date(deadline);

    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const difference = deadlineDate - today
    if (difference < 0) {
        timeLeft = "Deadline passed";
    } else if (difference === 0) { // Check if difference is within a day
        timeLeft = "Deadline for today";
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        timeLeft = `${days} days left`;
    }
    return timeLeft;
}