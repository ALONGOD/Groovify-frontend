import { eventBus, showSuccessMsg } from '../services/event-bus.service'
import { useState, useEffect, useRef } from 'react'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const [isClose, setIsClose] = useState(true)
  const timeoutIdRef = useRef()

  useEffect(() => {
    const unsubscribe = eventBus.on('show-msg', msg => {
      setMsg(msg)
	  setIsClose(false)
      if (timeoutIdRef.current) {
        timeoutIdRef.current = null
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = setTimeout(closeMsg, 3000)
    })
  }, [])

  function closeMsg() {
    // setMsg(null)
	setIsClose(true)
  }

  function msgClass() {
    return isClose ? '' : 'visible'
  }
  return (
    <section className={`user-msg ${msg?.type} ${msgClass()}`}>
      {/* <button onClick={closeMsg}>x</button> */}
      {msg?.txt}
    </section>
  )
}
