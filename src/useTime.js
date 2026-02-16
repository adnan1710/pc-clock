import { useEffect, useState } from 'react'

function pad(n) { return n.toString().padStart(2, '0') }

export default function useTime(is24HrFormat = true) {
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(id)
    }, [])

    let hh = pad(now.getHours())
    const mm = pad(now.getMinutes())
    const ss = pad(now.getSeconds())
    let meridiem = ''

    if (!is24HrFormat) {
        const hours = now.getHours()
        meridiem = hours >= 12 ? 'pm' : 'am'
        const hours12 = hours % 12 || 12
        hh = pad(hours12)
    }

    return { now, timeString: `${hh}:${mm}:${ss}`, hh, mm, ss, meridiem, is24HrFormat }
}
