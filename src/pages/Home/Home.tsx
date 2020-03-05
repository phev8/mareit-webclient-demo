import React from 'react';
import CameraControl from '../../components/CameraControl/CameraControl';
import { Container } from '@material-ui/core';

class Home extends React.Component {
    render() {
        return (
            <Container>
                < CameraControl />
            </Container>
        );
    }
}

export default Home;
