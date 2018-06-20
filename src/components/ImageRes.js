import React from 'react';
import Imagenation from 'imagenation';

class ImageRes extends React.Component {

  handleImage = (imageData) => {
    console.log(imageData);
  }

  render() {
    return <Imagenation scaleSize="500" onImage={this.handleImage} />
  }

}

export default ImageRes