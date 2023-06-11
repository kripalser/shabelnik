import { formats, formatDefault } from '@data/formats';
import { statuses } from '@data/statuses';

export const getThumbSize = (format: string = formatDefault) => {
    return formats[format.replace('×', 'x')];
};

// Todo: add types for statuses (share with Zod)
export const getStatus = (status: string) => {
    // @ts-ignore
    return statuses[status];
};
