import { useState, Dispatch, SetStateAction } from 'react'

interface UseCounterOutput {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: Dispatch<SetStateAction<number>>
}

export const useCounter = (defaultValue?: number): UseCounterOutput => {
  const [count, setCount] = useState(defaultValue ?? 0)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(defaultValue ?? 0)

  return {
    count,
    increment,
    decrement,
    reset,
    setCount
  }
}
