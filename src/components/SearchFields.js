import React from 'react';
import RadioDiv from "./RadioDiv.js"

class SearchFields extends React.Component {
    render() {
        const fields = this.props.fields.map(({name, options}) => {
            return (
            <div key={name}>
                <h2>{name}</h2>
                <RadioDiv name={name} key={`${name}Div`} options={options} updateSelected = {this.props.updateSelected} 
                selected={this.props.selected[name]}/>
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