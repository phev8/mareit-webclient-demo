import React, { useState, useEffect, useRef } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { getCameraConfigReq, rotateCameraReq, selectCameraReq } from '../api/leitstand';

interface CameraControlProps {
}

interface CameraConfig {
  camera: string; // Camera name
  yaw?: number;
  roll?: number;
  pitch?: number;
  translateX?: number;
  translateY?: number;
  translateZ?: number;
}

interface AvailableCameras {
  config: CameraConfig[];
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const minDelta = -0.1;
const maxDelta = 0.1;
const stepSize = 0.005;


const CameraControl: React.FC<CameraControlProps> = (props) => {
  const classes = useStyles();


  const [cameras, setCameras] = useState<AvailableCameras | undefined>(undefined);
  const [selectedCamera, setSelectedCamera] = useState<CameraConfig | undefined>(undefined);
  const [cameraControlValues, setCameraControlValues] = useState<CameraConfig | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const cameraControlValuesRef = useRef(cameraControlValues);
  cameraControlValuesRef.current = cameraControlValues;
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  const fetchCameras = async () => {
    setCameras(undefined);
    setIsLoading(true);
    if (error.length > 0) {
      setError('');
    }
    try {
      const resp = await getCameraConfigReq();
      const cams = resp.data;
      setIsLoading(false);
      setCameras(cams);
      setSelectedCamera(cams.config[0]);
      setCameraControlValues({
        ...cams.config[0],
        pitch: 0,
        roll: 0,
        yaw: 0,
      });
    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
      setError(JSON.stringify(err.message));
    }
  }

  const selectCamera = async () => {
    if (!selectedCamera) {
      return;
    }
    if (error.length > 0) {
      setError('');
    }

    try {
      await selectCameraReq(selectedCamera.camera)
    } catch (err: any) {
      console.error(err);
      setError(JSON.stringify(err.message));
    }
  }

  const rotateCamera = async () => {
    if (!cameraControlValuesRef.current) {
      return;
    }

    let valueString = ``;
    let nonzero = false;
    for (const k in cameraControlValuesRef.current) {
      if (k === 'camera') { continue }
      // rotateCamera?camera=CameraTest&type=YAW&value=0.1'
      let value = cameraControlValuesRef.current[k as keyof typeof cameraControlValues] as number;
      if (value !== 0) {
        if (k === 'yaw') {
          value = -value;
        }
        valueString += `&type=${k.toUpperCase()}&value=${value.toFixed(2)}`;
        nonzero = true;
      }
    }
    if (nonzero && !isLoadingRef.current) {
      if (error.length > 0) {
        setError('');
      }
      setIsLoading(true);
      try {
        await rotateCameraReq(cameraControlValuesRef.current.camera, valueString)
        setIsLoading(false);
      } catch (err: any) {
        console.error(err);
        setIsLoading(false);
        setError(JSON.stringify(err.message));
      }
    }
  }

  useEffect(() => {
    fetchCameras()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    selectCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCamera]);


  const handleCameraSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    const cam = cameras?.config.find(c => c.camera === value);
    if (cam) {
      setSelectedCamera(cam);
      setCameraControlValues({
        ...cam,
        pitch: 0,
        roll: 0,
        yaw: 0,
      });
    } else {
      setSelectedCamera(undefined);
    }
  }

  const handleControlChange = (key: string) => (event: any, newValue: number | number[]) => {
    const value = newValue;
    if (!cameraControlValues) {
      return;
    }
    setCameraControlValues(prev => {
      if (!prev) {
        return;
      }
      return {
        ...prev,
        [key]: value,
      }
    })
  };

  rotateCamera();

  const renderCameraControls = (camera: CameraConfig): React.ReactNode => {
    return <React.Fragment> {(Object.keys(camera) as Array<keyof typeof camera>).map(
      (key: keyof typeof camera) => {
        if (key === 'camera') {
          return null;
        }
        return <Box key={key} py={1}>
          <Typography variant="caption">
            {key}
          </Typography>
          <Slider
            min={minDelta}
            max={maxDelta}
            step={stepSize}
            value={cameraControlValues ? cameraControlValues[key] : 0}
            onChange={handleControlChange(key)}
            onChangeCommitted={() => {
              if (!cameraControlValues) {
                return;
              }
              setCameraControlValues(prev => {
                if (!prev) {
                  return;
                }
                return {
                  ...prev,
                  [key]: 0,
                }
              })
            }}
            aria-labelledby="continuous-slider" />
        </Box>;
      }
    )}
    </React.Fragment>
  };

  const cameraHandle = <React.Fragment>
    <FormControl className={classes.formControl} fullWidth>
      <InputLabel id="camera-select-label">Camera</InputLabel>
      <Select
        labelId="camera-select-label"
        id="camera-select"
        value={selectedCamera ? selectedCamera?.camera : 'none'}
        onChange={handleCameraSelectChange}
      >
        <MenuItem value="none">None</MenuItem>
        {cameras?.config.map(camera => {
          return <MenuItem value={camera.camera} key={camera.camera}>{camera.camera}</MenuItem>;
        })}
      </Select>
    </FormControl>
    {
      selectedCamera ? renderCameraControls(selectedCamera) : null
    }
  </React.Fragment>

  return (
    <div className="mt-3 mb-4">
      <h3>Available cameras</h3>
      {!cameras || cameras.config.length < 1 ? <div
        className="my-2 p-2 alert alert-light d-flex align-items-center">
        No cameras available
      </div> : cameraHandle}
    </div>
  );
};

export default CameraControl;
