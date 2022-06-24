import placeholder from './placeholder.jpg';
import './App.css';
import SearchFields from "./components/SearchFields.js"
import ImageContainer from "./components/ImageContainer.js"
import Footer from "./components/Footer.js"
import React from 'react';

import getWantedList from './functions/getWantedList';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        fields: [
        {name: "Sex", options: ["Any","Male","Female"]},
        {name: "Hair", options: ["Any","Gray","Black","Blond","Brown"]},
        {name: "Eyes", options: ["Any","Brown","Blue","Green","Dark"]}
        ],
        selected: {},
        wanted: [],
        wantedFiltered: [],
        display: {inSearch: false, resultNumber: 0, resultIndex: 0}
    }
  }

    componentDidMount() {
        this.initSelected();
        this.initWanted();
    }

    async initWanted() {
        const wanted = getWantedList();
        this.setState({wanted: wanted, wantedFiltered: wanted});
    }

    startSearch = () =>{
        const {Sex, Hair, Eyes} = this.state.selected;
        const newFilteredWanted = this.state.wanted.filter(crmnl => {
            // lowercase Eyes and Hair to match API JSON. Note Sex case does not change
            const sexMatch = (crmnl.sex === Sex) || (Sex === "Any");
            const eyesMatch = (crmnl.eyes === Eyes.toLowerCase()) || (Eyes === "Any");
            const hairMatch = (crmnl.hair === Hair.toLowerCase()) || (Hair === "Any");
            //console.log(`Sex. ${sexMatch}`);
            return (sexMatch && eyesMatch && hairMatch);
        });
        console.log(newFilteredWanted);
        this.setState({wantedFiltered: newFilteredWanted});
        this.setState(prevState => {
            let display = {...prevState.display};
            display.inSearch = true;
            display.resultNumber = newFilteredWanted.length;
            return {display};
        });
    }

    initSelected() {
        // Selected options state is initialized to "Any," since it should be common to all fields
        for(const {name} of this.state.fields) {
            this.setState(prevState => {
                let selected = {...prevState.selected};
                selected[name] = "Any";
                return {selected};
            });
        }
    }

    // updates selected options in state.
    updateSelected = (evt) => {
        // console.log("Updating that state");
        evt.preventDefault();
        try {
            const targetName = evt.target.name;
            const targetValue = evt.target.value;
            // compare targetName and targetValue to known fields in state to check validity
            const validName = this.state.fields.reduce((prev, fld) => prev || (targetName === fld.name), false);
            const validValue = this.state.fields.reduce((prev, fld) => prev || fld.options.includes(targetValue), false);
            // console.log(validName);
            if (validName && validValue) {
                this.setState(prevState => {
                    let selected = {...prevState.selected};
                    selected[targetName] = targetValue;
                    //console.log(this.state.selected[targetName]);
                    return {selected};
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    nextResult = () => {
        const dsp = this.state.display;
        if (dsp.inSearch && (dsp.resultNumber > (dsp.resultIndex + 1))) {
            this.setState(prevState => {
                let display = {...prevState.display};
                display.resultIndex += 1;
                return {display};
            });
        }
    }

    prevResult = () => {
        const dsp = this.state.display;
        if (dsp.inSearch && (dsp.resultIndex > 0)) {
            this.setState(prevState => {
                let display = {...prevState.display};
                display.resultIndex -= 1;
                return {display};
            });
        }
    }

    resetSearch = () => {
        this.setState({display: {inSearch: false, resultNumber: 0, resultIndex: 0}});
        this.initSelected();
    }

  render() {
    return (
        <div className="App">
        <header>
          <h1>
            FBI Most Wanted
          </h1>      
        </header>
        <div className="body">
            <SearchFields fields={this.state.fields} selected={this.state.selected}
             updateSelected={this.updateSelected} display={this.state.display}/>
            <ImageContainer img={placeholder} display={this.state.display} wanted={this.state.wantedFiltered}/>
        </div>
        <Footer search={this.startSearch} display={this.state.display} previous={this.prevResult} 
        next={this.nextResult} reset={this.resetSearch}/>
      </div>
      );
  }
}

export default App;
