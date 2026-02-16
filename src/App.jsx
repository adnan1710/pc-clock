import React, { useEffect, useRef, useState } from 'react'
import ClockDisplay from './components/ClockDisplay'
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

    // Save theme to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    // Save fontSize to localStorage
    useEffect(() => {
        localStorage.setItem('fontSize', fontSize)
    }, [fontSize])

    // Save flipMode to localStorage
    useEffect(() => {
        localStorage.setItem('flipMode', flipMode)
    }, [flipMode])

    // Save is24HrFormat to localStorage
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
            // fallback to browser fullscreen
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
        <div className={`app ${theme}`}>
            {flipMode ? (
                <FlipClock fontFamily={`Segoe UI, -apple-system, system-ui, sans-serif`} fontSize={fontSize} is24HrFormat={is24HrFormat} />
            ) : (
                <ClockDisplay fontFamily={`Segoe UI, -apple-system, system-ui, sans-serif`} fontSize={fontSize} is24HrFormat={is24HrFormat} />
            )}
            <ControlPanel isVisible={controlsVisible} setTheme={setTheme} fontSize={fontSize} setFontSize={setFontSize} onToggleFullscreen={toggleFullscreen} isFullscreen={isFullscreen} flipMode={flipMode} setFlipMode={setFlipMode} is24HrFormat={is24HrFormat} setIs24HrFormat={setIs24HrFormat} />
        </div>
    )
}
