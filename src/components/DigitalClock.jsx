import React from 'react'
import useTime from '../useTime'

export default function DigitalClock({ fontFamily, fontSize, is24HrFormat = true }) {
    const { timeString, hh, mm, ss, meridiem, minuteChanged } = useTime(is24HrFormat)

    return (
        <div className="clock-root" style={{ fontFamily, fontSize: `${fontSize}px` }}>
            <div className="time" aria-live="polite">
                <span className="digits">{hh}</span>
                <span className={`colon ${minuteChanged ? 'pulse' : ''}`}>:</span>
                <span className="digits">{mm}</span>
                <span className="colon pulse">:</span>
                <span className="digits seconds">{ss}</span>
                {!is24HrFormat && <span style={{ marginLeft: '12px', opacity: 0.8, fontSize: '0.35em', alignSelf: 'flex-end', marginBottom: '0.5em' }}>{meridiem}</span>}
            </div>
        </div>
    )
}
