import React from 'react';

class RadioDiv extends React.Component {
    render() {
        const options = this.props.options.map(optn => 
            <button
             name={this.props.name} value={optn} key={`${this.props.name}${optn}Button`} 
             onClick={this.props.updateSelected} className={(this.props.selected === optn)? "selected-button" : ""}>{optn}
            </button>
        );
        return (
            <div className="radio-div">
                {options}
            </div>   
        ); 
    }
}

export default RadioDiv;