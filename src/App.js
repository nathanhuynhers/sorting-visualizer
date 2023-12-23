import React, { Component } from 'react';
import Bar from './components/Bar';

//Icons
import Play from '@material-ui/icons/PlayCircleOutlineRounded';
import Forward from '@material-ui/icons/SkipNextRounded';
import Backward from '@material-ui/icons/SkipPreviousRounded';
import RotateLeft from '@material-ui/icons/RotateLeft';

//CSS Imports
import './App.css';


class App extends Component {
    state = {
        array: [],
        arraySteps: [],
        colorKey: [],
        colorSteps: [],
        currentStep: 0,
        count: 10,
        delay: 100,
        algorithm: '',
        timeouts: [],
    };

componentDidMount() {
    this.generateRandomArray();
}

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }
    generateRandomArray = () => {
        const count = this.state.count;
        const temp = [];

        for (let i = 0; i < count; i++) {
            temp.push(this.generateRandomNumber(50, 200));
        }

        this.setState({
            array: temp,
            arraySteps: [temp],
            currentStep: 0,
        })
    };

    changeArray = (index, value) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState({
            array: arr,
            arraySteps: [arr],
            currentStep: 0
        })
    }

    render() {
        let bars = this.state.array.map((value, index) => (
			<Bar
				key={index}
				index={index}
				length={value}
				color={0}
				changeArray={this.changeArray}
			/>
		));

            let playButton;

            if (this.state.arraySteps.length === this.state.currentStep) {
                playButton = (
                    <button className="controller">
                        <RotateLeft />
                    </button>
                );
            } else {
                playButton = (
                    <button className="controller">
                        <Play />
                    </button>
                );
            }
        return (
            <div className='app'>
                <div className="frame">
                    <div className="barsDiv container card">{bars}</div>
                </div>
				<div className='control-pannel'>
					<div className='control-buttons'>
						<button className='controller' onClick={this.previousStep}>
							<Backward />
						</button>
						{playButton}
						<button className='controller' onClick={this.nextStep}>
							<Forward />
						</button>
					</div>
				</div>
                <div className="panel"></div>
            </div>
        );
  }
}

export default App;
