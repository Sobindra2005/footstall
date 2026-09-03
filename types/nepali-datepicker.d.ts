declare module '@sbmdkl/nepali-datepicker-reactjs' {
  import React from 'react';

  interface NepaliDatePickerProps {
    onChange?: (params: { bsDate: string; adDate: string }) => void;
    theme?: string;
    language?: string;
    dateFormat?: string;
    minDate?: string;
    maxDate?: string;
  }

  const Calendar: React.FC<NepaliDatePickerProps>;
  export default Calendar;
}
