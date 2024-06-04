import dayjs from 'dayjs';
// function formatDate(date: Date) {
//     if (!(date instanceof Date)) {
//         console.error('Podano nieprawidłowy obiekt Date.');
//         return null;
//     }
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
  
//     return `${day}-${month}-${year}`;
// };

export const formatDate = (date: Date, format?: string) => {
    // if (!(date instanceof Date)) {
    //   console.error('Podano nieprawidłowy obiekt Date.');
    //   return null;
    // }
    return dayjs(date).format(format);
};

export const formatDateRange = (startDate: Date, endDate: Date, format = 'DD-MM-YYYY') => {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    console.error('Podano nieprawidłowy obiekt Date.');
    return null;
  }

  const formattedStartDate = dayjs(startDate).format(format);
  const formattedEndDate = dayjs(endDate).format(format);

  return `${formattedStartDate} - ${formattedEndDate}`;
};