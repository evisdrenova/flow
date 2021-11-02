import React, { useState, useEffect } from 'react';
import styles from '../pages/toolbar.module.css'
import { fabric } from 'fabric'



class ToolBar extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            canvas:'',
            setCanvas:''
        }
    }

    initCanvas = () => {
        new fabric.Canvas('c')
    }

    setCanvas (inituseEffect(()=>{
        setCanvas(initCanvas())
    },[])


    createRect = () => {

        // var rect = new fabric.Rect({
        //     left: 100,
        //     top: 100,
        //     fill: 'red',
        //     wdth: 20,
        //     height: 20
        // })

        // canvas.add(rect)
   }

    render() {
        return (
<>
    <div id="toolBarOutline" className={styles.toolbar}>
        <div id='squareButton' className={styles.squareButton}>
            <button id='squareButton' type='button' onClick={this.createRect}>Square</button>
        </div>
        <div id='lineButton' className={styles.lineButton} onClick={this.lineButtonClick}>
            <button id='lineButton' type='button'>Line</button>
        </div>
    </div>
    <div>
    <canvas id='c' className={styles.canvas}/>
    </div>
</>
        )
    }
}

export default Toolbar
