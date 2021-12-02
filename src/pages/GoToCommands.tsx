import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { getCurrentPoseReq, setGoToCommandReq } from '../api/roboter';
import Navbar from '../components/Navbar';

interface GoToCommandsProps {
}

export interface Pose {
  orientation?: {
    w: number;
    x: number;
    y: number;
    z: number;
  },
  orientation2d?: number;
  position?: {
    x: number;
    y: number;
    z: number;
  };
}

interface Bookmark {
  id: string;
  name: string;
  pose: Pose
}



const GoToCommands: React.FC<GoToCommandsProps> = (props) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarkLabel, setBookmarkLabel] = useState<string>("");

  useEffect(() => {
    loadBookmarks();
  }, [])

  const loadBookmarks = () => {
    const items = localStorage.getItem('bookmarks');
    if (!items) {
      return;
    }
    setBookmarks(JSON.parse(items));
  }

  const saveBookmarks = (items: Bookmark[]) => {
    localStorage.setItem('bookmarks', JSON.stringify(items));
  }

  const addBookmark = async () => {
    try {
      const resp = await getCurrentPoseReq();
      const pose = resp.data;
      // console.log(pose);

      const newbookmark = {
        id: (Math.random() * 1000000).toFixed(0),
        name: bookmarkLabel,
        pose: pose,
      };
      setBookmarks(prev => {
        const newBms = [
          ...prev,
          newbookmark
        ];
        saveBookmarks(newBms);
        setBookmarkLabel('');
        return newBms;
      })
    } catch (e: any) {
      console.error(e);
    }
  }

  const deleteBookmark = (bookmarkId: string) => {
    if (!window.confirm('Do you really want to remove this bookmark?')) {
      return;
    }
    setBookmarks(prev => {
      const newItems = prev.filter(p => p.id !== bookmarkId)
      saveBookmarks(newItems);
      return newItems;
    })
  }

  return (
    <React.Fragment>
      <Navbar useBack={true} />
      <div className="container" >

        <div className="my-3">
          <h3>Bookmarks</h3>
          {bookmarks.map((bookmark, index) => <div
            key={index.toFixed()}
            className="card my-2">
            <div className="card-body">
              <h5 className="card-title">{bookmark.name}</h5>
              <div className="d-flex">
                <button
                  className="btn btn-secondary flex-grow-1 me-2"
                  onClick={() => {
                    setGoToCommandReq({
                      waypointMaxForwardSpeed: 0,
                      maxForwardSpeed: 0,
                      waypointPose: bookmark.pose,
                    }).then(() => {
                      alert('Command successfully sent.')
                    }).catch((e: any) => console.error(e))
                  }}
                >Go to</button>
                <button
                  className="btn btn-outline-danger "
                  onClick={() => deleteBookmark(bookmark.id)}
                >Delete</button>
              </div>

            </div>
          </div>
          )}
          {bookmarks.length < 1 ? <div
            className="my-2 p-2 alert alert-light d-flex align-items-center">
            No bookmarks saved yet
          </div> : null}
        </div>


        <div className="my-3">
          <h3>Add Bookmarks</h3>
          <Form.Group className="mb-3" controlId="controlAPI">
            <Form.Label>Save current pose with the following label:</Form.Label>
            <Form.Control type="text"
              placeholder="Bookmark label"
              value={bookmarkLabel}
              onChange={(event) => {
                setBookmarkLabel(event.target.value);
              }}
            />
          </Form.Group>
          <button className="btn btn-primary"
            onClick={() => addBookmark()}
            disabled={bookmarkLabel.length < 1}
          >
            Add
          </button>

        </div>
      </div>
    </React.Fragment>
  );
};

export default GoToCommands;
