import { useState, useEffect, useCallback } from 'react'

export function usePomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)

  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      handleSessionComplete()
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft])

  const handleSessionComplete = useCallback(() => {
    if (isBreak) {
      setIsBreak(false)
      setTimeLeft(25 * 60)
      setIsActive(false)
      playNotification()
    } else {
      setIsBreak(true)
      setTimeLeft(5 * 60)
      setSessions(sessions + 1)
      playNotification()
    }
  }, [isBreak, sessions])

  const playNotification = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj==')
    audio.play()
  }

  const toggle = () => setIsActive(!isActive)
  const reset = () => {
    setIsActive(false)
    setIsBreak(false)
    setTimeLeft(25 * 60)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return {
    minutes,
    seconds,
    isActive,
    isBreak,
    sessions,
    toggle,
    reset
  }
}