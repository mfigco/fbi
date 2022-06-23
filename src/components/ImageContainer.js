import React from 'react';

class ImageContainer extends React.Component {
    render() {
        return (
            <div className="img-container">
                <img src={this.props.img} className="wanted-photo" alt="Wanted"/>
            </div>
        ); 
    }
}

export default ImageContainer;