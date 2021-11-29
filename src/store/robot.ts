import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RobotLabel } from '../types/robot'


interface RobotState {
    selectedRobot?: RobotLabel;
}

const initialState: RobotState = {

}

export const robotSlice = createSlice({
    name: 'counter',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        selectRobot: (state, action: PayloadAction<RobotLabel>) => {
            state.selectedRobot = action.payload
        },
    },
})

export const { selectRobot, } = robotSlice.actions


export default robotSlice.reducer