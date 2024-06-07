import { useEffect, useState } from "react"

// A debounce is a value that it waits a time until it changes, i do this so when typing for the input translation
// it doesnt call the api every time i hit a key in the keyboard, that way after a time it has passed, it would 
// indicate that the user has stopped writing.

// Since im attempting to parameterize this function, i wont be knowing what type the 'valueToObserve' is going to be,
// so im using generic type in order to be passed as a parameter. For Example:
// if the 'valueToObserve' would be a string -> useDebounce < string > ('hello', delay = 500)
export function useDebounce <T> (valueToObserve: T, delay = 500) {
  // We need a state to save the value that we are detecting if it has changed.
  const [ debounceValue, setDebounceValue ] = useState(valueToObserve)

  useEffect(() => {
    // Each time the delay time passes the value gets updated.
    const timer = setTimeout(() => {
      setDebounceValue(valueToObserve)
    }, delay)

    /*
    Clearing timeout on timer, so if user types BEFORE the timeout completes it clears it, and the 
    'valueToObserve' doesnt get settled. for example:
      0ms -> user types - 'h'
        useEffect ... (waits 500ms from this moment until updating value)
      150ms -> user types - 'he'
        clear useEffect
        useEffect ...(waits 500ms from this moment until updating value)
      300ms -> user types - 'hel'
        clear useEffect
        useEffect ... (waits 500ms from this moment until updating value)
      400ms -> user types - 'hell'
        clear useEffect
        useEffect ... (waits 500ms from this moment until updating value)
      900ms -> setDebounceValue (500 ms have elapsed since user typed, updates value)
    */
    return () => { clearTimeout(timer) }
  }, [valueToObserve, delay])

  return debounceValue
}