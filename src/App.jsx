import React, { useEffect, useRef, useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import DigitalClock from './components/DigitalClock'
import FlipClock from './components/FlipClock'
import ControlPanel from './components/ControlPanel'

export default function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
    const [controlsVisible, setControlsVisible] = useState(false)
    const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize')) || 240)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [flipMode, setFlipMode] = useState(() => localStorage.getItem('flipMode') === 'true' ? true : false)
    const [is24HrFormat, setIs24HrFormat] = useState(() => localStorage.getItem('is24HrFormat') === 'false' ? false : true)
    const timeoutRef = useRef(null)

    const muiTheme = useMemo(() => createTheme({
        palette: {
            mode: theme === 'light' ? 'light' : 'dark',
        },
    }), [theme])

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize)
    }, [fontSize])

    useEffect(() => {
        localStorage.setItem('flipMode', flipMode)
    }, [flipMode])

    useEffect(() => {
        localStorage.setItem('is24HrFormat', is24HrFormat)
    }, [is24HrFormat])

    useEffect(() => {
        const onMove = () => {
            setControlsVisible(true)
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setControlsVisible(false), 3000)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('keydown', onMove)
        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('keydown', onMove)
            clearTimeout(timeoutRef.current)
        }
    }, [])

    const toggleFullscreen = () => {
        if (window.electronAPI && window.electronAPI.toggleFullscreen) {
            window.electronAPI.toggleFullscreen()
        } else {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => { })
            else document.exitFullscreen().catch(() => { })
        }
    }

    useEffect(() => {
        if (window.electronAPI && window.electronAPI.onFullscreenChanged) {
            window.electronAPI.onFullscreenChanged((isFull) => setIsFullscreen(Boolean(isFull)))
        }
    }, [])

    return (
        <ThemeProvider theme={muiTheme}>
            <div className={`app ${theme}`}>
                {flipMode ? (
                    <FlipClock fontFamily={`Segoe UI, -apple-system, system-ui, sans-serif`} fontSize={fontSize} is24HrFormat={is24HrFormat} />
                ) : (
                    <DigitalClock fontFamily={`Segoe UI, -apple-system, system-ui, sans-serif`} fontSize={fontSize} is24HrFormat={is24HrFormat} />
                )}
                <ControlPanel isVisible={controlsVisible} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} flipMode={flipMode} setFlipMode={setFlipMode} is24HrFormat={is24HrFormat} setIs24HrFormat={setIs24HrFormat} theme={theme} />
            </div>
        </ThemeProvider>
    )
}
