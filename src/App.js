import React, { Component } from 'react';
import Bar from './components/Bar';

//Algorithms
import BubbleSort from './algorithms/bubble_sort';

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
        algorithm: 'Bubble Sort',
        timeouts: [],
    };

    ALGORITHMS = {
        'Bubble Sort': BubbleSort,
    }

    componentDidMount() {
        this.generateRandomArray();
    }

    generateSteps = () => {
        let array = this.state.array.slice();
        let steps = this.state.arraySteps.slice();
        let colorSteps = this.state.colorSteps.slice();
        
        this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps)

        this.setState({
            arraySteps: [steps],
            colorSteps: colorSteps,
        })
    }

    clearColorKey = () => {
        let blankKey = new Array(this.state.count).fill(0);

        this.setState({
            colorKey: blankKey,
            colorSteps: [blankKey]
        })
    }

    generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min)
    }
    generateRandomArray = () => {
        this.clearColorKey();
        const count = this.state.count;
        const temp = [];

        for (let i = 0; i < count; i++) {
            temp.push(this.generateRandomNumber(50, 200));
        }

        this.setState({
            array: temp,
            arraySteps: [temp],
            currentStep: 0,
        }, () => {
            this.generateSteps();
        });
    };

    changeArray = (index, value) => {
        let arr = this.state.array;
        arr[index] = value;
        this.setState({
            array: arr,
            arraySteps: [arr],
            currentStep: 0
        }, () => {
            this.generateSteps();
        });
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
