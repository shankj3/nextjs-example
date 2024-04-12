'use client'
import { ErrorBoundary, Provider, useRollbar } from '@rollbar/react'
import { useEffect } from 'react'

const rollbarConfig = {
    // I added this to vercel. It's the client token, it's fine
    accessToken: process.env.NEXT_PUBLIC_ROLLBAR_CLIENT_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
    server: {
      root: "https://nextjs-example-beta-ten.vercel.app/",
    },
    code_version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    payload: {
      environment: 'production',
      client: {
        javascript: {
          source_map_enabled: true, // false by default
          
          // -- Add this into your configuration ---
          code_version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
          // ---------------------------------------
          
          // Optionally have Rollbar guess which frames the error was 
          // thrown from when the browser does not provide line 
          // and column numbers.
          guess_uncaught_frames: true
        }
      }
    }
  };
  

export function TestRollbarWrappedComponent() {
    return (
    <Provider config={rollbarConfig}>
        <ErrorBoundary>
          <TestError/>
        </ErrorBoundary>
      </Provider>
    )
}

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
    <button 
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" 
        onClick={onClick}>throw an exception</button>
    </div>
  );
}