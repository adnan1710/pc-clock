import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function ControlPanel({ isVisible, setTheme, fontSize, setFontSize, onToggleFullscreen, isFullscreen, flipMode, setFlipMode, is24HrFormat, setIs24HrFormat, theme }) {
    const [isAnimating, setIsAnimating] = useState(false)

    const toggleTheme = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setTheme(theme === 'light' ? 'dark' : 'light')
            setIsAnimating(false)
        }, 150)
    }

    return (
        <div className={`control-panel ${isVisible ? 'visible' : ''}`} aria-hidden={!isVisible}>
            <div className="controls-inner">
                <Tooltip title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}>
                    <IconButton 
                        color="inherit" 
                        onClick={toggleTheme}
                        disabled={isAnimating}
                        sx={{ 
                            position: 'relative',
                            overflow: 'hidden',
                            '&:hover': { transform: 'scale(1.1)' }
                        }}
                    >
                        <div className={`icon-container ${isAnimating ? 'animating' : ''}`}>
                            <WbSunnyIcon className={`theme-icon sun-icon ${theme === 'light' && !isAnimating ? 'active' : ''} ${isAnimating ? 'slide-out' : ''}`} />
                            <DarkModeIcon className={`theme-icon moon-icon ${theme === 'dark' && !isAnimating ? 'active' : ''} ${isAnimating ? 'slide-in' : ''}`} />
                        </div>
                    </IconButton>
                </Tooltip>

                <Box sx={{ width: 200, display: 'flex', alignItems: 'center', gap: 1, marginLeft:3, marginRight:5 }}>
                    <Box sx={{ minWidth: 40 }}>
                        <label style={{ fontSize: 12 }}>Size</label>
                    </Box>
                    <Slider min={36} max={240} value={fontSize} onChange={(e, v) => setFontSize(v)} aria-label="font-size" />
                </Box>

                <FormControlLabel control={<Switch checked={flipMode} onChange={(e) => setFlipMode(e.target.checked)} />} label={<span style={{ fontSize: 12 }}>{flipMode ? 'Flip' : 'Digital'}</span>} />

                <FormControlLabel control={<Switch checked={is24HrFormat} onChange={(e) => setIs24HrFormat(e.target.checked)} />} label={<span style={{ fontSize: 12 }}>{is24HrFormat ? '24 HR' : '12 HR'}</span>} />

                <Tooltip title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
                    <IconButton color="inherit" onClick={onToggleFullscreen}>
                        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}
