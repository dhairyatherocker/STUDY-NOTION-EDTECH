import React from 'react'

const Highlighttext = ({text,gradient,size,weight}) => {
  return (
    <div className={`${gradient} ${size} ${weight} `} >
      {text}
    </div>
  )
}

export default Highlighttext;
