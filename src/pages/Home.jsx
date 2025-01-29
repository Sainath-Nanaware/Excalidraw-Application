import React, { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva';


function Home() {
    const [shapes,setShapes]=useState([{}])
    const canvasRef=useRef(null)

    useEffect(()=>{

      if(canvasRef.current){
        let canvasREF=canvasRef.current
        let x=0;
        let y=0;
        let height=0;
        let width=0


        canvasREF.addEventListener('mousedown',(e)=>{
          x=e.clientX;
          y=e.clientY;
        })

        canvasREF.addEventListener("mouseup",(e)=>{
          width=e.clientX-x
          height=e.clientY-y

          console.log("x is ", x, "y is ", y);
          console.log("height is ", height, "widht is ", width);

          let shape = {
            x: x,
            y: y,
            width: width,
            height: height,
            fill: "red",
            type: "rect",
            id: Date.now(),
          };
          
          setShapes((prev)=>[...prev,shape])
        })
      

       return () => {
        canvasREF.removeEventListener("mouseup");
        canvasREF.removeEventListener("mousedown");
        canvasREF.removeEventListener("mousemove");
        };
      }

    },[])


    //function add test rectangle object
    function drawShapes(){
      console.log("hii")
       let shape = {
           x: 200,
           y: 200,
           width: 200,
           height: 200,
          //  fill: "red",
           type: "rect",
           id: Date.now(),
        };

        setShapes((prev)=>[...prev,shape])
    }
  return (
    <>
    {shapes.length===0?(
      <p className='p-10 text-center text-[20px] font-semibold bg-slate-800 text-white'>
        Welcome Excalidraw
    </p>):(
      <>
      {/* kanva design part */}
      <button onClick={drawShapes} className='p-[10px] bg-green-600 rounded-xl'>Draw Shapes</button>
        <Stage width={window.innerWidth} height={window.innerHeight} className='bg-slate-800' ref={canvasRef}>
        <Layer>
              {shapes.map((element)=>{
                  if(element.type==='rect'){
                    return<Rect
                      key={element.id}
                      x={element.x}
                      y={element.y}
                      width={element.width}
                      height={element.height}
                      fill="red"
                    />
                  }
              })}
        </Layer>
        </Stage>
        </>
        )}
    </>
  )
}

export default Home
