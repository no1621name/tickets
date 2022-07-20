import { format } from 'date-fns';

export const formatDate: formatDate = (str: string, type: string) => {
  const date = new Date(str);
  return format(date, type)
}