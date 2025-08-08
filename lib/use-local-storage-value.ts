import { useEffect, useRef, useState } from 'react'

export function useLocalStorageValue(key: string) {
  const [value, setValue] = useState('')
  const writeTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const storedValue = localStorage.getItem(key)
    if (storedValue !== null) {
      setValue(storedValue)
    }
  }, [key])

  useEffect(() => {
    // Debounce writes to avoid jank during rapid stream updates
    if (writeTimeoutRef.current !== null) {
      clearTimeout(writeTimeoutRef.current)
    }
    writeTimeoutRef.current = window.setTimeout(() => {
      localStorage.setItem(key, value)
    }, 150)
    return () => {
      if (writeTimeoutRef.current !== null) {
        clearTimeout(writeTimeoutRef.current)
        writeTimeoutRef.current = null
      }
    }
  }, [key, value])

  return [value, setValue] as const
}
