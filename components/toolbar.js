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
    //intializes and mounts the canvas
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
            //mouseDownHandler: isOverConnection,
        }

        const rightConnection = {
            x: 0.6,
            y: 0.0,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseDownHandler: isOverConnection,
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
            //mouseDownHandler: isOverConnection,
        }

        const topConnection = {
            x: 0.0,
            y: -0.6,
            cursorStyle: 'pointer',
            cornerSize: 24,
            cornerColor: 'green',
            cornerStyle: 'circle',
            //mouseDownHandler: isOverConnection,
        }

        fabric.Object.prototype.controls.rightConnection = new fabric.Control(rightConnection)
        fabric.Object.prototype.controls.leftConnection = new fabric.Control(leftConnection)
        fabric.Object.prototype.controls.topConnection = new fabric.Control(topConnection)
        fabric.Object.prototype.controls.bottomConnection = new fabric.Control(bottomConnection)

    }
    //function that checks if the pointer is in the range of the connector coords box
     const inRange = (point, polygon) => {

        var x = point[0], y = point[1];

        var inside = false;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            var xi = polygon[i][0], yi = polygon[i][1];
            var xj = polygon[j][0], yj = polygon[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        return inside;
    };

    //function that goes through options object and returns just the corners and expands the corners to account from more flexiblity in where the user picks 
    const normalizeBorderPoints = (options, connector) => {
        let rightConnectorCorners = [
            [options.target.oCoords.rightConnection.corner.bl.x - 10, options.target.oCoords.rightConnection.corner.bl.y + 10],
            [options.target.oCoords.rightConnection.corner.br.x + 10, options.target.oCoords.rightConnection.corner.br.y + 10],
            [options.target.oCoords.rightConnection.corner.tl.x - 10, options.target.oCoords.rightConnection.corner.tl.y - 10],
            [options.target.oCoords.rightConnection.corner.tr.x + 10, options.target.oCoords.rightConnection.corner.tr.y - 10]
        ]
        let leftConnectorCorners = [
            [options.target.oCoords.leftConnection.corner.bl.x - 10, options.target.oCoords.leftConnection.corner.bl.y + 10],
            [options.target.oCoords.leftConnection.corner.br.x + 10, options.target.oCoords.leftConnection.corner.br.y + 10],
            [options.target.oCoords.leftConnection.corner.tl.x - 10, options.target.oCoords.leftConnection.corner.tl.y - 10],
            [options.target.oCoords.leftConnection.corner.tr.x + 10, options.target.oCoords.leftConnection.corner.tr.y - 10]
        ]

        let topConnectorCorners = [
            [options.target.oCoords.topConnection.corner.bl.x - 10, options.target.oCoords.topConnection.corner.bl.y + 10],
            [options.target.oCoords.topConnection.corner.br.x + 10, options.target.oCoords.topConnection.corner.br.y + 10],
            [options.target.oCoords.topConnection.corner.tl.x - 10, options.target.oCoords.topConnection.corner.tl.y - 10],
            [options.target.oCoords.topConnection.corner.tr.x + 10, options.target.oCoords.topConnection.corner.tr.y - 10]
        ]

        let bottomConnectorCorners = [
            [options.target.oCoords.bottomConnection.corner.bl.x - 10, options.target.oCoords.bottomConnection.corner.bl.y + 10],
            [options.target.oCoords.bottomConnection.corner.br.x + 10, options.target.oCoords.bottomConnection.corner.br.y + 10],
            [options.target.oCoords.bottomConnection.corner.tl.x - 10, options.target.oCoords.bottomConnection.corner.tl.y - 10],
            [options.target.oCoords.bottomConnection.corner.tr.x + 10, options.target.oCoords.bottomConnection.corner.tr.y - 10]
        ]

        switch (connector) {
            case 'right':
                return rightConnectorCorners
                break;
            case 'left':
                return leftConnectorCorners;
                break;
            case 'top':
                return topConnectorCorners;
                break;
            case 'bottom':
                return bottomConnectorCorners;
            default:
                console.log('Couldn\'t recognize direction')
        }
    }

    const returnConnectorCenterPoints = (options, connector) => {

        let rightConnectorCenterPoints = [options.target.oCoords.rightConnection.x, options.target.oCoords.rightConnection.y, options.target.oCoords.rightConnection.x, options.target.oCoords.rightConnection.y]

        let leftConnectorCenterPoints = [options.target.oCoords.leftConnection.x, options.target.oCoords.leftConnection.y, options.target.oCoords.leftConnection.x, options.target.oCoords.leftConnection.y]

        let topConnectorCenterPoints = [options.target.oCoords.topConnection.x, options.target.oCoords.topConnection.y, options.target.oCoords.topConnection.x, options.target.oCoords.topConnection.y]

        let bottomConnectorCenterPoints = [options.target.oCoords.bottomConnection.x, options.target.oCoords.bottomConnection.y, options.target.oCoords.bottomConnection.x, options.target.oCoords.bottomConnection.y]

        switch (connector) {
            case 'right':
                return rightConnectorCenterPoints
                break;
            case 'left':
                return leftConnectorCenterPoints
                break;
            case 'top':
                return topConnectorCenterPoints
                break;
            case 'bottom':
                return bottomConnectorCenterPoints
            default:
                console.log('Couldn\'t recognize direction')
        }

    }
    //function that draws the line originating from the center of the connector box
    const drawLineFromConnector = (connectorCenterPoints) => {

        const connectionLine = new fabric.Line(
            connectorCenterPoints,
            {
                fill: 'red',
                stroke: 'red',
                strokeWidth: 5,
                originX: 'center',
                originY: 'center'
            })
        return connectionLine
    }



    const moveShapeUpdateConnectorCoords = () => {
        const activeObject = canvas.getActiveObject()
        canvas.on('object:moving', function(options){
            console.log('moving')
        })


    }

     const createConnection = (canv, options) => {
        const activeObject = canvas.getActiveObject()
        if (activeObject == null) return;
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
            console.log('options', options)
            let pointer = canvas.getPointer(options.e) //pointer coords object
            var points = [pointer.x, pointer.y, pointer.x, pointer.y] //pointer coords

            if (options.target == null) { //return if the user doesn't click on a shape
                return
            }

            let rightConnector = normalizeBorderPoints(options, 'right') //array of right connector coords
            let leftConnector = normalizeBorderPoints(options, 'left')//array of left connector coords
            let topConnector = normalizeBorderPoints(options, 'top') //array of top connector coords
            let bottomConnector = normalizeBorderPoints(options, 'bottom')//array of bottom connector coords

            let rightConnectorCenterPoints = returnConnectorCenterPoints(options, 'right')
            let leftConnectorCenterPoints = returnConnectorCenterPoints(options, 'left')
            let topConnectorCenterPoints = returnConnectorCenterPoints(options, 'top')
            let bottomConnectorCenterPoints = returnConnectorCenterPoints(options, 'bottom')

            let arrayOfConnectors = [rightConnector, leftConnector, topConnector, bottomConnector]

            let arrayOfConnectorCenterPoints = [rightConnectorCenterPoints, leftConnectorCenterPoints, topConnectorCenterPoints, bottomConnectorCenterPoints]

            console.log(canvas)

            for (var i = 0; i < arrayOfConnectors.length; i++) {
                if (inRange([points[0], points[1]], arrayOfConnectors[i]) == true) {
                    console.log('its in range!')
                    let connectionLine = drawLineFromConnector(arrayOfConnectorCenterPoints[i]) //returns a connectionLine that was drawn            
                    canvas.add(connectionLine) //adds the connectionLine that was rturned to the canvas
                    canvas.on('mouse:move', function (o) {
                        if (!isDown) return;
                        var pointer = canvas.getPointer(o.e);
                        connectionLine.set({ x2: pointer.x, y2: pointer.y });
                        canvas.on('mouse:up', function(options){
                            console.log('mouseup')


                        })
                        canvas.requestRenderAll();
                    })
                break
                }
            }
        });

        canvas.on('mouse:up', function (options) {
            isDown = false

        })
        canvas.renderAll()
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


        //original line of code to draw the line from the connector

         // if (inRange([points[0], points[1]], rightConnector) == true) {
            //     console.log('its in range!')
            //     let connectionLine = drawLineFromConnector(rightConnectorCenterPoints) //returns a connectionLine that was drawn            
            //     canvas.add(connectionLine) //adds the connectionLine that was rturned to the canvas
            //     canvas.on('mouse:move', function (o) {
            //         if (!isDown) return;
            //         var pointer = canvas.getPointer(o.e);
            //         connectionLine.set({ x2: pointer.x, y2: pointer.y });
            //         canvas.renderAll();
            //     })
            // } else if(inRange([points[0], points[1]], leftConnector) == true) {
            //     console.log('its in range!')
            //     let connectionLine = drawLineFromConnector(leftConnectorCenterPoints) //returns a connectionLine that was drawn            
            //     canvas.add(connectionLine) //adds the connectionLine that was rturned to the canvas
            //     canvas.on('mouse:move', function (o) {
            //         if (!isDown) return;
            //         var pointer = canvas.getPointer(o.e);
            //         connectionLine.set({ x2: pointer.x, y2: pointer.y });
            //         canvas.renderAll();
            //     })

            // } else if(inRange([points[0], points[1]], topConnector) == true) {
            //     console.log('its in range!')
            //     let connectionLine = drawLineFromConnector(topConnectorCenterPoints) //returns a connectionLine that was drawn            
            //     canvas.add(connectionLine) //adds the connectionLine that was rturned to the canvas
            //     canvas.on('mouse:move', function (o) {
            //         if (!isDown) return;
            //         var pointer = canvas.getPointer(o.e);
            //         connectionLine.set({ x2: pointer.x, y2: pointer.y });
            //         canvas.renderAll();
            //     })

            // } else if(inRange([points[0], points[1]], bottomConnector) == true){
            //     console.log('its in range!')
            //     let connectionLine = drawLineFromConnector(bottomConnectorCenterPoints) //returns a connectionLine that was drawn            
            //     canvas.add(connectionLine) //adds the connectionLine that was rturned to the canvas
            //     canvas.on('mouse:move', function (o) {
            //         if (!isDown) return;
            //         var pointer = canvas.getPointer(o.e);
            //         connectionLine.set({ x2: pointer.x, y2: pointer.y });
            //         canvas.renderAll();
            //     })

            // }else {
            //     console.log('its not in range!')
            // }