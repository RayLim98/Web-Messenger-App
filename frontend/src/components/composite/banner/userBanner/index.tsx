import React, { useState } from 'react'
import styles from './style.module.css'
import myImage from './example.jpg'  


const UserBanner = () => {
    const [image, setImage] = useState<any>(null)

    const openModel = () => {
        console.log('hello')
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.bannerWrapper}>
                <img className = {styles.imageWrapper} onClick={openModel}/>
                <div className = {styles.description}>
                    description here
                </div>
            </div>
        </div>
    )
}

export default UserBanner