import React from 'react';

class RadioDiv extends React.Component {
    render() {
        const options = this.props.options.map(optn => 
        <>                 
            <input type="radio" name={this.props.name} value={optn} key={`${this.props.name}${optn}Radio`}/>
            <label htmlFor={this.props.name} key={`${this.props.name}${optn.tag}Label`} style={{color: this.props.color}}>{optn}</label>
        </>);
        return (
            <div className="radio-div">
                {options}
            </div>   
        ); 
    }
}

export default RadioDiv;