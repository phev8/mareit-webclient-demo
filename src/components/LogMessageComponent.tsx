import React, { useState, useEffect } from 'react';
import { getLogMessageReq } from '../api/roboter';

interface LogMessageComponentProps {
}

interface LogMessage {
  level: number;
  message: string;
}

const LogMessageComponent: React.FC<LogMessageComponentProps> = (props) => {
  const [logMessages, setLogMessages] = useState<LogMessage[]>([])

  useEffect(() => {
    fetchLogMessage()
    const timer = setTimeout(() => fetchLogMessage(), 5000)
    return () => clearTimeout(timer);
  }, [])


  const fetchLogMessage = async () => {
    try {
      const resp = await getLogMessageReq()
      const logMessage = resp.data;
      setLogMessages(prev => {
        if (prev.length > 0) {
          if (prev.find(l => l.message === logMessage.message)) {
            return prev;
          }
        }
        return [
          ...prev,
          logMessage,
        ]
      })
    } catch (e: any) {
      console.error(e);
    }
  }



  return (
    <div className="mt-3">
      <h3>Log messages</h3>
      {logMessages.map((logMessage, index) => <div
        key={index.toFixed()}
        className="my-2 p-2 alert alert-info d-flex align-items-center">
        <span className="badge bg-secondary me-2">L{logMessage.level}</span>
        {logMessage.message}
      </div>)}
      {logMessages.length < 1 ? <div
        className="my-2 p-2 alert alert-light d-flex align-items-center">
        No log messages available
      </div> : null}
    </div>
  );
};

export default LogMessageComponent;
