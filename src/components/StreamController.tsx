import React, { useEffect, useState } from 'react';
import PlayIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import { deleteStreamReq, getRobotStreamReq, initStreamReq } from '../api/leitstand';

interface StreamControllerProps {
}

interface Stream {
  robotName: string;
  name: string;
}

const StreamController: React.FC<StreamControllerProps> = (props) => {
  const [streams, setStreams] = useState<Stream[]>([])

  useEffect(() => {
    fetchStreams()
    const timer = setTimeout(() => fetchStreams(), 5000)
    return () => clearTimeout(timer);
  }, [])


  const fetchStreams = () => {
    try {
      getRobotStreamReq().then(resp => {
        const streams = resp.data;
        if (!streams) {
          return;
        }
        const newStreams: Stream[] = [];
        for (let key in streams) {
          streams[key].forEach((stream: any) => {
            newStreams.push({
              robotName: key,
              name: stream.name,
            })
          });
        }
        setStreams(newStreams);
      })
    } catch (e: any) {
      console.error(e);
    }
  }

  const initStream = (stream: Stream) => {
    try {
      initStreamReq(stream.robotName, stream.name).then(() => {
        fetchStreams();
      })
    } catch (e: any) {
      console.error(e);
    }
  }

  const deleteStream = (stream: Stream) => {
    try {
      deleteStreamReq(stream.robotName, stream.name).then(() => {
        fetchStreams();
      })
    } catch (e: any) {
      console.error(e);
    }
  }



  return (
    <div className="mt-3">
      <h3>Available streams</h3>
      {streams.map((stream, index) =>
        <div
          key={index.toFixed()}
          className="card my-2">
          <div className="card-body">
            <h5 className="card-title">
              <span className="badge bg-secondary me-2">{stream.robotName}</span>
              {stream.name}</h5>
            <div className="d-flex">
              <button
                className="btn btn-outline-primary flex-grow-1 me-2"
                onClick={() => initStream(stream)}
              >
                <PlayIcon />
              </button>
              <button
                className="btn btn-outline-danger flex-grow-1"
                onClick={() => deleteStream(stream)}
              >
                <StopIcon />
              </button>
            </div>

          </div>
        </div>
      )}
      {streams.length < 1 ? <div
        className="my-2 p-2 alert alert-light d-flex align-items-center">
        No streams available
      </div> : null}
    </div>
  );
};

export default StreamController;
