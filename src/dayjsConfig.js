import dayjsInstance from "dayjs";
import "dayjs/locale/it";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";

const dayjs = dayjsInstance;

dayjs.extend(weekday);
dayjs.extend(customParseFormat);

export default dayjs;
