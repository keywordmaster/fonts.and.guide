import dayjs from "dayjs";

export function convertModifiedDateFormat(date: string) {
  return dayjs(date).format("YYYY-MM-DD");
}
