import { useEffect, useRef, useState } from 'react'

interface CountdownControllers {
  startCountdown: () => void
  stopCountdown: () => void
  resetCountdown: () => void
}

interface CountdownOption {
  countStart: number
  countStop?: number
  intervalMs?: number
  isIncrement?: boolean
}

export const useCountdown = ({
  countStart,
  countStop = 0,
  intervalMs = 1000,
  isIncrement = false
}: CountdownOption): [number, CountdownControllers] => {
  // TODO on hook useCounter
  const [count, setCount] = useState(countStart)
  const interval = useRef<NodeJS.Timer>()

  const startCountdown = () => {
    // TODO on hook useInterval
    interval.current = setInterval(() => {
      setCount((prev) => {
        if (prev === countStop) {
          clearInterval(interval.current)
          return prev
        }
        return isIncrement ? prev + 1 : prev - 1
      })
    }, intervalMs)
  }

  const stopCountdown = () => {
    clearInterval(interval.current)
  }

  const resetCountdown = () => {
    stopCountdown()
    setCount(countStart)
  }

  useEffect(() => stopCountdown, [])

  return [count, { startCountdown, stopCountdown, resetCountdown }]
}
