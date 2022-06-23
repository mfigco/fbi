import React from 'react';
import RadioDiv from "./RadioDiv.js"

class SearchFields extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selected: {}};
    }

    componentDidMount() {
        // Selected options state is initialized to "Any," since it should be common to all fields
        for(const {name} of this.props.fields) {
            this.setState(prevState => {
                let selected = {...prevState.selected};
                selected[name] = "Any";
                return {selected};
            });
        }
    }

    // updates selected options in state.
    updateSelected = (evt) => {
        //console.log("Updating that state");
        evt.preventDefault();
        try {
            const targetName = evt.target.name;
            const targetValue = evt.target.value;
            this.setState(prevState => {
                let selected = {...prevState.selected};
                selected[targetName] = targetValue;
                //console.log(this.state.selected[targetName]);
                return {selected};
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const fields = this.props.fields.map(({name, options}) => {
            return (
            <div key={name}>
                <h2>{name}</h2>
                <RadioDiv name={name} key={`${name}Div`} options={options} updateSelected = {this.updateSelected} 
                selected={this.state.selected[name]}/>
            </div>
            )
        });

        return (
            <form className="search-fields">
                {fields}
            </form>
        );
    }
}

export default SearchFields;