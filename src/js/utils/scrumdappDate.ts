const regex = /^(\d{4})-(\d{2})-(\d{2})$/;

export function parseScrumdappDate(date: string) {
  const result = regex.exec(date);
  if (result == null) {
    throw new Error("Could not parse date");
  }
  const year = parseInt(result[1]);
  const month = parseInt(result[2]);
  const day = parseInt(result[3]);

  if (year === 0 || month === 0 || day === 0) {
    throw new Error("Could not parse date");
  }

  const resultDate = Date.UTC(year, month - 1, day);
  const resultDateObject = new Date(resultDate);

  if (
    resultDateObject.getUTCFullYear() !== year ||
    resultDateObject.getUTCMonth() !== month - 1 ||
    resultDateObject.getUTCDate() !== day
  ) {
    throw new Error("Could not parse date");
  }
  return resultDateObject;
}

export function toScrumdappDate(date: Date) {
  return `${date.getFullYear()}-${parseStr(date.getMonth() + 1)}-${parseStr(date.getDate())}`;
}

export function parseStr(i: number): string {
  let s = i.toString();
  while (s.length < 2) {
    s = "0" + s;
  }
  return s;
}
