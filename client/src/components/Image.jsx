'''Image Component requires from imageData.json file'''

import React from 'react';

let Image = function statelessFunctionComponentClass(props) {

  let imageUrl = props.source.image;
  let className = props.source.class_name;
  let source = require(`../assets/img/logo/${imageUrl}`);

  return (
    <li><a href="/"><img src={source} className={className}/></a></li>
  );
};

export default Image;
