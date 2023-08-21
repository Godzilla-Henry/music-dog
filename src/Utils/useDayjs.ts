import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // import plugin
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn'; // import locale

dayjs.extend(duration);
dayjs.extend(isLeapYear); // use plugin
dayjs.locale('zh-cn'); // use locale

export const formatMsTime = (ms: number) => {
    return dayjs.duration({
        seconds: dayjs.duration(ms).seconds(),
        minutes: dayjs.duration(ms).minutes(),
    }).format('mm:ss') 
}

export const formatSTime = (s: number) => {
    s = s * 1000;
    return dayjs.duration({
        seconds: dayjs.duration(s).seconds(),
        minutes: dayjs.duration(s).minutes(),
    }).format('mm:ss') 
}