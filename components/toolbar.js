import React, { useState, useEffect } from 'react';
import styles from '../pages/toolbar.module.css'
import { fabric } from 'fabric'

export default function Toolbar() {
    const [canvas, setCanvas] = useState('')

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 500,
            width: 500,
            backgroundColor: 'pink',
            preserveObjectStacking: true
        })
    )

    useEffect(() => {
        setCanvas(initCanvas());
    }, []);

    //creates a rectangle and adds it to the canvas
    const createRect = canv => {
        const rect = new fabric.Rect({
            top: 100,
            left: 100,
            height: 200,
            width: 200,
            fill: 'yellow',
            cornerColor: 'blue',
            cornerStyle: 'rect',
            transparentCorners: false
        });

        rect.on('selected', function (options) {
            console.log('rectangle is clicked')
        })

        canv.add(rect);
    }
    //creates a circle and adds it to the canvas
    const createCircle = canv => {
        const circle = new fabric.Circle(
            {
                radius: 30,
                fill: '#f55',
                top: 100,
                left: 100
            });
        canv.add(circle)
    }
    //creates a line and adds it to the canvas
    const createLine = canv => {
        const line = new fabric.Line(
            [50, 10, 200, 150], //[x-axis,y-axis, length, rotation]
            {
                fill: 'red',
                stroke: 'red',
                strokeWidth: 5
            })
        canv.add(line)

    }
    // function that creates and positions the connection controls
    const newControls = () => {

        const leftConnection = {
            x: -0.6,
            y: 0.0,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseUpHandler: createConn,
        }

        const rightConnection = {
            x: 0.6,
            y: 0.0,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseUpHandler: createConn,
        }

        const bottomConnection = {
            x: 0.0,
            y: 0.6,
            // offsetX: 16,
            // offsetY: -16,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseUpHandler: createConn,
        }

        const topConnection = {
            x: 0.0,
            y: -0.6,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseUpHandler: createConn,
        }

        fabric.Object.prototype.controls.rightConnection = new fabric.Control(rightConnection)
        fabric.Object.prototype.controls.leftConnection = new fabric.Control(leftConnection)
        fabric.Object.prototype.controls.topConnection = new fabric.Control(topConnection)
        fabric.Object.prototype.controls.bottomConnection = new fabric.Control(bottomConnection)

    }

    // const createConn = () => {
    //     const activeObject = canvas.getActiveObject()
    //     console.log(activeObject)
    //     canvas.requestRenderAll()
    // }




    //creates a connection
    const createConnection = (canv, options) => {
        const activeObject = canvas.getActiveObject()
        newControls()
        activeObject.setControlsVisibility({
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
            ml: false,
            mt: false,
            mb: false,
            mr: false
        })


        var connectionLine, isDown;
        canvas.on('mouse:down', function (options) {
            isDown = true
            console.log(options)
            let pointer = canvas.getPointer(options.e)
            console.log(pointer)
            var points = [pointer.x, pointer.y, pointer.x, pointer.y]

            connectionLine = new fabric.Line(
                coords,
                {
                    fill: 'red',
                    stroke: 'red',
                    strokeWidth: 5
                })

            let coords = points
            let coords2 = [321.1, 200.5, 100, 150]
            canvas.add(connectionLine)
        });

        canvas.on('mouse:move', function (o) {
            if(!isDown) return;
            var pointer = canvas.getPointer(o.e);
            connectionLine.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();

            canvas.on('mouse:up', function (options) {
                isDown = false
            })
        })


        //some fun code to create a connection point and then update it's coordinates every time the box moves so that it always stays in the same position
        // //create connection point
        // const connectionPoint = new fabric.Circle(
        //     {
        //         radius: 6,
        //         fill: '#f55',
        //         strokeWidth: 2,
        //         top: 94,
        //         left: 94
        //     });

        // canv.add(connectionPoint)
        // canv.bringToFront(connectionPoint)

        //activeObject.hasControls = false
        // console.log(activeObject.getCoords())
        // const acoords = activeObject.aCoords
        // const acoordstlx = acoords.tl.x
        // const acoordstly = acoords.tl.y
        //console.log('these are the acoords:', acoords)

        // canvas.on('object:moving', function (options) {
        //     console.log('options:', options)
        //     var xcoord = options.target.oCoords.tl.x
        //     var ycoord = options.target.oCoords.tl.y
        //     console.log('the x coord', xcoord, 'the y coord', ycoord)
        //     connectionPoint.set('top', ycoord)
        //     connectionPoint.set('left', xcoord)
        // })


        canvas.requestRenderAll()

    }

    return (
        <>
            <div id="toolBarOutline" className={styles.toolbar}>
                <div id='squareButton' className={styles.button}>
                    <button id='squareButton' type='button' onClick={() => createRect(canvas)}>Square</button>
                </div>
                <div id='circleButton' className={styles.button}>
                    <button id='circleButton' type='button' onClick={() => createCircle(canvas)}>Circle</button>
                </div>
                <div id='lineButton' className={styles.button}>
                    <button id='lineButton' type='button' onClick={() => createLine(canvas)}>Line</button>
                </div>
                <div id='connectionButton' className={styles.button}>
                    <button id='connectionButton' type='button' onClick={() => createConnection(canvas)}>Connection</button>
                </div>
            </div>
            <div>
                <canvas id='canvas' />
            </div>
        </>
    )
}