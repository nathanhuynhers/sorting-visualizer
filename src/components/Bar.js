import React from 'react'
import './Bar.css';

function Bar({index, length, color}) {
  const barStyle = {
    height: length

  }
  const colors = [['rgba(61, 90, 241, 0.5)', 'rgba(61, 90, 241, 0.2)'], 
                  ['rgba(61, 90, 241, 0.5)', 'rgba(61, 90, 241, 0.2)']
  ];

  return (
    <>
      <div className="bar" style={barStyle}></div>
    </>
  )
}

export default Bar