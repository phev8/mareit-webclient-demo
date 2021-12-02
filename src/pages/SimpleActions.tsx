import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { getSimpleActionsReq, setSimpleActionCommandReq } from '../api/roboter';
import Navbar from '../components/Navbar';

interface SimpleActionsProps {
}

interface SimpleAction {
  name: string;
  type: {
    type: 'TRIGGER' | 'VALUE_INT' | 'VALUE_FLOAT',
    maxState?: number;
    stepSize?: number;
    valueNames?: Array<{ name: string, value: number }>
  }
}

const SimpleActions: React.FC<SimpleActionsProps> = (props) => {
  const [actions, setActions] = useState<SimpleAction[]>([]);

  useEffect(() => {
    fetchActions()
  }, [])

  const fetchActions = async () => {
    try {
      const resp = await getSimpleActionsReq();
      console.log(resp.data)
      setActions(resp.data.actions);
    } catch (e: any) {
      console.error(e);
    }
  }

  const renderAction = (action: SimpleAction) => {
    if (action.type.type === 'TRIGGER') {
      return <button className="btn btn-danger w-100"
        onClick={() => {
          setSimpleActionCommandReq(action.name, 1).then(resp => {
            console.log(resp)
          }).catch((e: any) => console.error(e))
        }}
      >{action.name}</button>
    } else if (action.type.valueNames !== undefined) {
      return <Form.Select aria-label="Default select example"
        onChange={(event) => {
          const value = event.target.value;
          setSimpleActionCommandReq(action.name, value).then(resp => {
            console.log(resp)
          }).catch((e: any) => console.error(e))
        }}
      >
        {action.type.valueNames.map(v => <option key={v.value} value={v.value !== undefined ? v.value : 0}>{v.name}</option>)}
      </Form.Select>

    } else {
      return <div><Form.Range
        max={action.type.maxState}
        step={action.type.stepSize}
        defaultValue={0}
        onChange={(event) => {
          const value = event.target.value;
          setSimpleActionCommandReq(action.name, value).then(resp => {
            console.log(resp)
          }).catch((e: any) => console.error(e))
        }}
      ></Form.Range>
      </div>
    }
  }

  return (
    <React.Fragment>
      <Navbar useBack={true} />
      <div className="container">
        <div className="my-3">
          <h3>Simple Actions</h3>
          {actions.map((action, index) => <div
            key={index.toFixed()}
            className="card my-2">
            <div className="card-body">
              <h5 className="card-title">{action.name}</h5>
              {renderAction(action)}
            </div>
          </div>
          )}
          {actions.length < 1 ? <div
            className="my-2 p-2 alert alert-light d-flex align-items-center">
            No available actions.
          </div> : null}
        </div>


      </div>
    </React.Fragment>
  );
};

export default SimpleActions;
