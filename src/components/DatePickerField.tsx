import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerFieldProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DatePickerField({ value, onChange }: DatePickerFieldProps) {
  const now = new Date();
  const selectedDate = value || now;

  const isToday = selectedDate.toDateString() === now.toDateString();

  const minDate = now;
  const minTime = isToday ? now : new Date().setHours(0, 0, 0, 0);
  const maxTime = new Date().setHours(23, 59, 59, 999); // Always allow until end of day

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      timeIntervals={15}
      timeFormat="HH:mm"
      dateFormat="yyyy-MM-dd HH:mm"
      minDate={minDate}
      minTime={new Date(minTime)}
      maxTime={new Date(maxTime)} // ✅ Required with minTime
      className="w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
    />
  );
}
