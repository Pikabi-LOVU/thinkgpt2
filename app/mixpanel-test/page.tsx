'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { trackEvent, identifyUser, resetUser, getMixpanelStatus } from '@/lib/mixpanel'

export default function MixpanelTestPage() {
  const [status, setStatus] = useState<any>(null)
  const [eventLog, setEventLog] = useState<string[]>([])

  useEffect(() => {
    // Update status on mount
    const updateStatus = () => {
      const currentStatus = getMixpanelStatus()
      setStatus(currentStatus)
      addLog(`Status updated: ${JSON.stringify(currentStatus)}`)
    }

    updateStatus()
    
    // Update status every 2 seconds
    const interval = setInterval(updateStatus, 2000)
    
    return () => clearInterval(interval)
  }, [])

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setEventLog(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 20))
  }

  const testTrackEvent = () => {
    addLog('Sending test event...')
    trackEvent('Test Event', {
      test_id: Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString(),
      page: 'mixpanel-test'
    })
  }

  const testIdentifyUser = () => {
    const userId = `test_user_${Math.random().toString(36).substring(7)}`
    addLog(`Identifying user: ${userId}`)
    identifyUser(userId, {
      name: 'Test User',
      email: 'test@example.com',
      created_at: new Date().toISOString()
    })
  }

  const testResetUser = () => {
    addLog('Resetting user...')
    resetUser()
  }

  const checkConsole = () => {
    if (typeof window !== 'undefined' && (window as any).mixpanelDebug) {
      const debugStatus = (window as any).mixpanelDebug.getStatus()
      addLog(`Debug status: ${JSON.stringify(debugStatus)}`)
      
      // Test track from debug
      (window as any).mixpanelDebug.testTrack()
      addLog('Sent debug test event')
    } else {
      addLog('Mixpanel debug not available')
    }
  }

  const testServerConnection = async () => {
    addLog('Testing server connection to Mixpanel...')
    try {
      const response = await fetch('/api/mixpanel-status')
      const data = await response.json()
      addLog(`Server test result: ${data.message} (Status: ${data.status || 'N/A'})`)
      if (!data.success) {
        addLog(`Error: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      addLog(`Connection test failed: ${error}`)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Mixpanel Test Page</CardTitle>
          <CardDescription>
            Test and debug Mixpanel integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Status Display */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Current Status:</h3>
              {status ? (
                <div className="space-y-1 text-sm font-mono">
                  <div>Initialized: <span className={status.initialized ? 'text-green-600' : 'text-red-600'}>{status.initialized ? 'Yes' : 'No'}</span></div>
                  <div>Token: {status.token}</div>
                  <div>Environment: {status.environment}</div>
                  <div>Client Side: {status.isClientSide ? 'Yes' : 'No'}</div>
                  <div>LocalStorage: {status.hasLocalStorage ? 'Available' : 'Not Available'}</div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            {/* Test Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={testTrackEvent} variant="default">
                Track Test Event
              </Button>
              <Button onClick={testIdentifyUser} variant="secondary">
                Identify User
              </Button>
              <Button onClick={testResetUser} variant="outline">
                Reset User
              </Button>
              <Button onClick={checkConsole} variant="outline">
                Check Debug Console
              </Button>
              <Button onClick={testServerConnection} variant="outline">
                Test Server Connection
              </Button>
            </div>

            {/* Event Log */}
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
              <h3 className="font-semibold mb-2">Event Log:</h3>
              <div className="space-y-1 text-xs font-mono">
                {eventLog.length > 0 ? (
                  eventLog.map((log, index) => (
                    <div key={index} className="text-gray-300">
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No events yet...</div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg text-sm">
              <h3 className="font-semibold mb-2">How to verify Mixpanel is working:</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open browser Developer Tools (F12)</li>
                <li>Go to the Console tab</li>
                <li>Look for [Mixpanel] logs when clicking test buttons</li>
                <li>Go to the Network tab and filter by "mixpanel" to see API calls</li>
                <li>Check your Mixpanel dashboard for incoming events</li>
              </ol>
            </div>

            {/* Debug Commands */}
            <div className="bg-yellow-50 p-4 rounded-lg text-sm">
              <h3 className="font-semibold mb-2">Console Commands (Development only):</h3>
              <code className="block bg-gray-800 text-gray-100 p-2 rounded text-xs">
                mixpanelDebug.getStatus() // Check current status<br/>
                mixpanelDebug.getInstance() // Get Mixpanel instance<br/>
                mixpanelDebug.testTrack() // Send test event
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}