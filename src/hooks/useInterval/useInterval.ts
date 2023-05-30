import { useEffect, useLayoutEffect, useRef } from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)

  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay === null) return

    const interval = setInterval(() => {
      savedCallback.current()
    }, delay || 0)

    return () => clearInterval(interval)
  }, [])
}
