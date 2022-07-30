import { format } from 'date-fns';

export const formatDate: formatDate = (str: string, type: string) => {
  if(!str.length || !type.length) { return ''; }
  const date = new Date(str);
  return format(date, type)
}