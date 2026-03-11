import React, { useState, useEffect } from 'react'
const UseWindowSize = () => {
const [winowSize, setWindowSize] = useState({
  width: undefined,
  height: undefined
});
useEffect(()=>{
const handleResize = ()=>{
  setWindowSize({
     width: window.innerWidth,
  height: window.innerHeight
  });
}
 handleResize();
 window.addEventListener("resize", handleResize);
 return () => window.removeEventListener("resize", handleResize);
},[]);

  return winowSize;
}

export default UseWindowSize
