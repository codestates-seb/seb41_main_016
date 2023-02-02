//checkin checkout date 변환
export const DateFormat = (d1) => {
  const date = new Date(d1);
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
