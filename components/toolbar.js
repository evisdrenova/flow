import React from 'react'
import styles from '../pages/sketchpad.module.css'

class ToolBar extends React.Component{


    squareButtonClick = e => {
        document.get
    }


    render(){
        return(
            <>
            <div id="toolBarOutline" className={styles.toolbar} onclick={this.squareButtonClick}>
                <button id='squareButton' className={styles.squareButton} type='button'>Square</button>
                
                </div>
            </>
        )
    }

}

export default ToolBar;