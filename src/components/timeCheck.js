import { isAfter, subDays, parseISO } from "date-fns"
const timeCheck = (inputTime, daysAgo) => {
    
    const now = new Date()
    const hourAgo = subDays(now, daysAgo)
    const inputTimeParsed = parseISO(inputTime)
    return(isAfter(hourAgo, inputTimeParsed))
}

export default timeCheck