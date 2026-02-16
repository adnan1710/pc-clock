import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useTime from '../useTime'

const backgroundColor = 'rgba(55, 57, 78, 0.25)';

const FlipCard = ({ value, label }) => {
    const [prevValue, setPrevValue] = useState(value)
    const [isFlipping, setIsFlipping] = useState(false)

    useEffect(() => {
        if (value !== prevValue) {
            setIsFlipping(true)
            const timer = setTimeout(() => {
                setPrevValue(value)
                setIsFlipping(false)
            }, 600)
            return () => clearTimeout(timer)
        }
    }, [value, prevValue])

    return (
        <Box
            sx={{
                position: 'relative',
                perspective: '1000px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '1.5em',
                width: 'auto',
                minWidth: '100px',
            }}
        >
            {/* Invisible spacer to define container width for flex layout */}
            <Box
                sx={{
                    visibility: 'hidden',
                    minWidth: '100px',
                    height: '100%',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 16px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                }}
            >
                {value}
            </Box>
            <Paper
                elevation={2}
                sx={{
                    position: 'absolute',
                    minWidth: '100px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: backgroundColor,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    color: 'inherit',
                    backfaceVisibility: 'hidden',
                    transformOrigin: 'bottom',
                    animation: isFlipping ? 'flipCardTop 0.6s forwards' : 'none',
                    boxSizing: 'border-box',
                }}
            >
                {isFlipping ? prevValue : value}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    position: 'absolute',
                    minWidth: '100px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: backgroundColor,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    color: 'inherit',
                    backfaceVisibility: 'hidden',
                    transformOrigin: 'top',
                    animation: isFlipping ? 'flipCardBottom 0.6s forwards' : 'none',
                    boxSizing: 'border-box',
                }}
            >
                {value}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    position: 'absolute',
                    minWidth: '100px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: backgroundColor,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    color: 'inherit',
                    backfaceVisibility: 'hidden',
                    transformOrigin: 'bottom',
                    opacity: isFlipping ? 1 : 0,
                    animation: isFlipping ? 'flipCardBackTop 0.6s forwards' : 'none',
                    boxSizing: 'border-box',
                }}
            >
                {prevValue}
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    position: 'absolute',
                    minWidth: '100px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: backgroundColor,
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontVariantNumeric: 'tabular-nums',
                    fontWeight: 600,
                    color: 'inherit',
                    backfaceVisibility: 'hidden',
                    transformOrigin: 'top',
                    opacity: isFlipping ? 1 : 0,
                    animation: isFlipping ? 'flipCardBackBottom 0.6s forwards' : 'none',
                    boxSizing: 'border-box',
                }}
            >
                {value}
            </Paper>
        </Box>
    )
}

const FlipClock = ({ fontFamily, fontSize, is24HrFormat = true }) => {
    const { hh, mm, ss, meridiem } = useTime(is24HrFormat)

    return (
        <Box
            sx={{
                WebkitAppRegion: 'no-drag',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: fontFamily,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    fontSize: `${fontSize}px`,
                }}
            >
                <FlipCard value={hh} label="hours" />
                <Box sx={{ opacity: 0.8, margin: '0 6px' }}>:</Box>
                <FlipCard value={mm} label="minutes" />
                <Box sx={{ opacity: 0.8, margin: '0 6px' }}>:</Box>
                <FlipCard value={ss} label="seconds" />
                {!is24HrFormat && <Box sx={{ marginLeft: '12px', opacity: 0.8, fontSize: '0.35em', alignSelf: 'flex-end', paddingBottom: '0.05em' }}>{meridiem}</Box>}
            </Box>
        </Box>
    )
}

export default FlipClock

