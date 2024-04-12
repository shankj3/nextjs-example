'use client'
import { useRollbar } from '@rollbar/react'
import { useEffect } from 'react'

export function TestError() {
  const rollbar = useRollbar()
  useEffect(() => {
      rollbar.error('howdy')
  }, [rollbar])
  const onClick = () => {
    throw new Error("OH LORD I'M AN UNHANDLED EXCEPTION")
  }
  return (
    <div>
    meomeow I throw an error 
    <button onClick={onClick}>throw an exception</button>
    </div>
  );
}