export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  function getOrdinalSuffix(d: number): string {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${day}${getOrdinalSuffix(day)}, ${month} ${year}`;
}

export function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSecs < 60) {
    return `${diffSecs} Sec${diffSecs !== 1 ? "s" : ""} ago`;
  } else if (diffMins < 60) {
    return `${diffMins} Min${diffMins !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
    const mins = diffMins % 60;
    return `${diffHours} Hr${diffHours !== 1 ? "s" : ""} ${mins} Min${
      mins !== 1 ? "s" : ""
    } ago`;
  } else {
    const hours = diffHours % 24;
    return `${diffDays} Day${diffDays !== 1 ? "s" : ""} ${hours} Hr${
      hours !== 1 ? "s" : ""
    } ago`;
  }
}

export const formatStatus = (status: string): string => {
  if (status === "NotCompleted") {
    return "Not Completed";
  }
  return status;
};
