import { isAfter, subHours, parseISO } from "date-fns"
const timeCheck = (inputTime) => {
    
    const now = new Date()
    const hourAgo = subHours(now, 24)
    const inputTimeParsed = parseISO(inputTime)
    return(isAfter(hourAgo, inputTimeParsed))
}

export default timeCheck