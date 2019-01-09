//Image Component requires from imageData.json file in client folder

import React from 'react';

let Image = function statelessFunctionComponentClass(props) {

  let imageName = props.source.image;
  let className = props.source.class_name;
  let imageUrl = props.source.image_url;
  let source = require(`../assets/img/logo/${imageName}`);

  return (
    <li><a href={imageUrl}><img src={source} className={className} alt={className}/></a></li>
  );
};

export default Image;
