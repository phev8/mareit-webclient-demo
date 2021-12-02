import React, { useState, useEffect } from 'react';
import { getPermissionRequestsReq, setPermissionRequestReq } from '../api/roboter';

interface PermissionRequestsProps {
}

interface PermissionRequest {
  robotName: string;
  description: string;
  requestuid: string;
}

const PermissionRequests: React.FC<PermissionRequestsProps> = (props) => {
  const [permissionReqs, setPermissionReqs] = useState<PermissionRequest[]>([])

  useEffect(() => {
    fetchPermissionRequests()
    const timer = setTimeout(() => fetchPermissionRequests(), 3000)
    return () => clearTimeout(timer);
  }, [])


  const fetchPermissionRequests = () => {
    getPermissionRequestsReq().then(resp => {
      const requests = resp.data;
      if (!requests) {
        return;
      }
      const PRs: PermissionRequest[] = [];
      for (let key in requests) {
        requests[key].forEach((pr: any) => {
          PRs.push({
            robotName: key,
            description: pr.description,
            requestuid: pr.requestuid
          })
        });
      }
      setPermissionReqs(PRs);
    }).catch((e: any) => console.error(e))

  }

  const replyToPermissionRequest = (pr: PermissionRequest, allow: boolean) => {
    setPermissionRequestReq(pr.robotName, pr.requestuid, allow).then(() => {
      fetchPermissionRequests();
    }).catch((e: any) => console.error(e))
  }

  return (
    <div className="mt-3">
      <h3>Permission requests</h3>
      {permissionReqs.map((pr, index) => <div
        key={index.toFixed()}
        className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{pr.robotName}</h5>
          <p className="card-text">{pr.description}</p>
          <div className="d-flex">
            <button
              className="btn btn-outline-primary flex-grow-1 me-2"
              onClick={() => replyToPermissionRequest(pr, true)}
            >Allow</button>
            <button
              className="btn btn-outline-danger flex-grow-1"
              onClick={() => replyToPermissionRequest(pr, false)}
            >Deny</button>
          </div>

        </div>
      </div>
      )}
      {permissionReqs.length < 1 ? <div
        className="my-2 p-2 alert alert-light d-flex align-items-center">
        No permission requests
      </div> : null}
    </div>
  );
};

export default PermissionRequests;
