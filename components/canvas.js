import React from 'react'
import styles from '../pages/canvas.module.css'
import toolbar from '../components/toolbar'

class Canvas extends React.Component{
    squareButtonClick = e => {
        console.log('hello')
    }


    lineButtonClick = e =>{

    }

    randomClick = () => {
        return 'hello'
    }



    render(){
        return(
            <>
            <div className={styles.canvas}>
            </div>
            </>
        )
    }
}


export default Canvas;