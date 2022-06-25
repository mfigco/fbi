import React from 'react';
import RadioDiv from "./RadioDiv.js"

class SearchFields extends React.Component {
    render() {
        const display = this.props.display;
        const wanted = this.props.wanted;
        let fields = [];
        if (display.inSearch) {        
            if (Array.isArray(wanted) && wanted.length !== 0) {
                const current = wanted[display.resultIndex];
                const capFirst = (str) => {
                    if (str === undefined || str === "") {
                        return;
                    }
                    return str.charAt(0).toUpperCase() + str.slice(1);
                }
                for (const fld in current) {
                    // Condition to avoid displaying image url
                    if (fld === "image") {
                        continue;
                    }
                    let fldText = "";
                    if (current[fld] === null) {
                        fldText = "N/A";
                    } else {
                        fldText = capFirst(current[fld]);
                    }
                    fields.push(
                        <div key={fld}>
                            <h2>{capFirst(fld)}</h2>
                            <label className="searchLabel">{fldText}</label>
                        </div>
                    );
                }
            } else {
                fields = 
                <div>
                    <h3>No Results Found</h3>
                </div>
            }
        } else {
                fields = this.props.fields.map(({name, options}) => {
                return (
                <div key={name}>
                    <h2>{name}</h2>
                    <RadioDiv name={name} key={`${name}Div`} options={options} updateSelected = {this.props.updateSelected} 
                    selected={this.props.selected[name]}/>
                </div>
                )
            });
        }   

        return (
            <form className="search-fields">
                {fields}
            </form>
        );
    }
}

export default SearchFields;