export enum Months {
  January = "January",
  February = "February",
  March = "March",
  April = "April",
  May = "May",
  June = "June",
  July = "July",
  August = "August",
  September = "September",
  October = "October",
  November = "November",
  December = "December",
}

const mapMonthDescription = (key: string, content: any) => {
  const monthContent: Record<Months, any> = {
    [Months.January]: content["month-january"],
    [Months.February]: content["month-february"],
    [Months.March]: content["month-march"],
    [Months.April]: content["month-april"],
    [Months.May]: content["month-may"],
    [Months.June]: content["month-june"],
    [Months.July]: content["month-july"],
    [Months.August]: content["month-august"],
    [Months.September]: content["month-september"],
    [Months.October]: content["month-october"],
    [Months.November]: content["month-november"],
    [Months.December]: content["month-december"],
  };

  return monthContent[key as Months];
};

export default mapMonthDescription;
