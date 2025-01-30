import React, { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Circle } from 'react-konva';


function Home() {
    const [shapes,setShapes]=useState([{}])
    const canvasRef=useRef(null)
    const idRef=useRef(null)//store previous shape id 

    useEffect(()=>{

      if(canvasRef.current){
        let canvasREF=canvasRef.current
        let x=0;
        let y=0;
        let height=0;
        let width=0
        let isDrawing=false


        canvasREF.addEventListener('mousedown',(e)=>{
          isDrawing=true
          x=e.clientX;
          y=e.clientY;

           idRef.current = Date.now();

            let shape = {
          x: x,
          y: y,
          width: 0,
          height: 0,
          type: "rect",
          fill: "red",
          stroke: "white",
          strokeWidth: 30,
          opacity: 0.5,
          id: idRef.current,
        };

        setShapes((p) => [...p, shape]);
        })

         canvasREF.addEventListener("mousemove", (e) => {
            if (!isDrawing) return;

          setShapes((shapes) => {
              return shapes.map((shape) => {
              if (shape.id === idRef.current) {
                shape.height = e.clientY - y;
                shape.width = e.clientX - x;
              }
              return shape;
            });
        });
      });


        canvasREF.addEventListener("mouseup",(e)=>{
          isDrawing=false
          width=e.clientX-x
          height=e.clientY-y

          console.log("x is ", x, "y is ", y);
          console.log("height is ", height, "widht is ", width);

          // let shape = {
          //   x: x,
          //   y: y,
          //   width: width,
          //   height: height,
          //   fill: "red",
          //   type: "rect",
          //   id: Date.now(),
          // };
          
          // setShapes((prev)=>[...prev,shape])
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
  )
}
export default Home
