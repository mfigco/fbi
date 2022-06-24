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
        wantedFiltered: [],
        // resultNumber specifies the number of currently loaded results, not total results
        display: {inSearch: false, resultNumber: 0, resultIndex: 0, pageLoaded: 0, loadedAll: false}
    }
  }

    componentDidMount() {
        this.initSelected();
    }

    startSearch = async() => {
        this.setState(prevState => {
            let display = {...prevState.display};
            display.inSearch = true;
            return {display};
        })
        await this.searchWanted();
    }

    searchWanted = async () => {
        const {Sex, Hair, Eyes} = this.state.selected;
        const dsp = this.state.display;
        if (dsp.loadedAll) {
            return;
        }
        const newWanted = await getWantedList(Sex, Hair, Eyes, dsp.pageLoaded + 1);
        if (newWanted.length === 0) {
            this.setState(prevState => {
                let display = {...prevState.display};
                display.loadedAll = true;
                return {display};
            });
            return;
        }
        //console.log(newWanted);
        this.setState(prevState => {
            let display = {...prevState.display};
            display.resultNumber += newWanted.length;
            display.pageLoaded += 1;
            const wantedFiltered = [...prevState.wantedFiltered, ...newWanted];
            console.log(wantedFiltered);
            return {display, wantedFiltered};
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
        if (!dsp.inSearch) {
            return;
        }
        // load more results at this totally arbitrary point
        if (!dsp.loadedAll && (dsp.resultNumber < (dsp.resultIndex + 4))) {
            this.searchWanted();
        }
        if (dsp.resultNumber > (dsp.resultIndex + 1)) {
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
        this.setState({display: {inSearch: false, resultNumber: 0, resultIndex: 0, pageLoaded: 0, loadedAll: false}});
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
