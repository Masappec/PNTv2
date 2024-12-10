import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MonthYearPicker({ onChangeDate }) {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => {
        setSelectedDate(date);
        onChangeDate(date); // Notifica al padre
      }}
      dateFormat="MM/yyyy"
      showMonthYearPicker
      placeholderText="Selecciona un periodo 🗓️"
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-8 text-sm text-gray-900 outline-primary focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}


export default MonthYearPicker;