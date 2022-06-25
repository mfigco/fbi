import React from 'react';

class ImageContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.index !== this.props.index) {
            this.setState({loaded: false})
        }
    }

    // No
    handleLoad = () => {
        this.setState({loaded: true});
    }

    render() {
        let image;
        const wanted = this.props.wanted;
        if (!this.props.inSearch || (wanted === undefined) || (wanted.length === 0)) {
            image = <img src={this.props.img} className="wanted-photo" alt="FBI Most Wanted"/>
        } else {
            const current = wanted[this.props.index];
            const source = current.image;
            const name = current.name;
            const hidden = {display: "none"};
            image = 
            <>
                <img src={source} className="wanted-photo" alt={name} 
                onLoad={this.handleLoad} style={this.state.loaded? {} : hidden}/>
                <img src={this.props.notFound} className="wanted-photo" alt={name} style={!this.state.loaded? {} : hidden}/>
            </>
        }
        return (
            <div className="img-container">
                {image}
            </div>
        ); 
    }
}

export default ImageContainer;