import { useMemo, useState } from "react";
import cx from "classix";

import styles from "./Calendar.module.css";

const daysOfTheWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const sundayWeekToMondayWeekDayMap: Record<number, number> = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
};

export interface DateCellItem {
  date: number;
  month: number;
  year: number;
  type: "next" | "prev" | "current";
}

const VISIBLE_CELLS_AMOUNT = 7 * 6;

const getDayOfTheWeek = (date: Date) => {
  return sundayWeekToMondayWeekDayMap[date.getDay()];
};

const getDaysAmountInMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);
  nextMonthDate.setMinutes(-1);
  return nextMonthDate.getDate();
};

const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay);

  const daysAmountInPrevMonth = getDaysAmountInMonth(year, month - 1);

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
      type: "prev",
    });
  }

  return dateCells;
};

const getNextMonthDays = (year: number, month: number) => {
  const nextMonthCellsAmount =
    VISIBLE_CELLS_AMOUNT -
    getPreviousMonthDays(year, month).length -
    getCurrentMonthDays(year, month, getDaysAmountInMonth(year, month)).length;

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] =
    month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = 1; i <= nextMonthCellsAmount; i++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: i,
      type: "next",
    });
  }

  return dateCells;
};

const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number
) => {
  const dateCells: DateCellItem[] = [];

  for (let i = 1; i <= numberOfDays; i++) {
    dateCells.push({
      year,
      month,
      date: i,
      type: "current",
    });
  }

  return dateCells;
};

export const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const [panelYear, setPanelYear] = useState(() => selectedDate.getFullYear());
  const [panelMonth, setPanelMonth] = useState(
    () => selectedDate.getMonth() + 1
  );

  const [selectedYear, selectedMonth, selectedDay] = useMemo(() => {
    return [
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      selectedDate.getDate(),
    ];
  }, [selectedDate]);

  const dateCells = useMemo(() => {
    return [
      ...getPreviousMonthDays(panelYear, panelMonth - 1),
      ...getCurrentMonthDays(
        panelYear,
        panelMonth,
        getDaysAmountInMonth(panelYear, panelMonth - 1)
      ),
      ...getNextMonthDays(panelYear, panelMonth - 1),
    ];
  }, [panelMonth, panelYear]);

  const onPrevMonthClick = () => {
    setPanelMonth((prev) => {
      if (prev === 0) {
        setPanelYear((prev) => prev - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const onNextMonthClick = () => {
    setPanelMonth((prev) => {
      if (prev === 11) {
        setPanelYear((prev) => prev + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const onDateClick = (date: DateCellItem) => {
    setSelectedDate(new Date(date.year, date.month - 1, date.date));
  }


  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.btn} onClick={onPrevMonthClick}>
          <svg
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path d="M10.594 7 7.297 3.703l1.414-1.414L14.423 8 8.71 13.711l-1.414-1.414L10.594 9H2V7h8.594z"></path>
          </svg>
        </span>
        <div className={styles.title}>
          {months[panelMonth - 1]} {panelYear}
        </div>
        <span className={styles.btn} onClick={onNextMonthClick}>
          <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.594 7 7.297 3.703l1.414-1.414L14.423 8 8.71 13.711l-1.414-1.414L10.594 9H2V7h8.594z"></path>
          </svg>
        </span>
      </div>
      <div className={styles.dateTimeGrid}>
        {daysOfTheWeek.map((day) => (
          <div key={day} className={cx(styles.dayOfWeek)}>
            {day}
          </div>
        ))}

        {dateCells.map((item, index) => {
          const isSelected =
            item.year === selectedYear &&
            item.month === selectedMonth &&
            item.date === selectedDay;
          return (
            <div
              key={index}
              className={cx(styles.cell, isSelected && styles.selected)}
              style={{ opacity: item.type === "current" ? 1 : 0.5 }}
              onClick={() => onDateClick(item)}
            >
              {item.date}
            </div>
          );
        })}
      </div>
    </div>
  );
};
