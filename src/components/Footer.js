import React from 'react';

class Footer extends React.Component {
    render() {
        const display = this.props.display;
        let buttons;
        if (display.inSearch) {
            const prevEnabled = display.resultIndex > 0;
            const nextEnabled = display.resultNumber > (display.resultIndex + 1);
            buttons = 
            <>
            <button onClick={this.props.previous} disabled={!prevEnabled}>Previous</button>
            <button onClick={this.props.reset}>New Search</button>
            <button onClick={this.props.next} disabled={!nextEnabled}>Next</button>
            </>
        } else {
            buttons = <button onClick={this.props.search}> Search </button>;
        }
        return (
            <footer>
                {buttons}
            </footer>
        ); 
    }
}

export default Footer;