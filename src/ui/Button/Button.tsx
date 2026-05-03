'use client'

import { FC } from 'react'
import { motion } from "motion/react"

// styles

import styles from './Button.module.css'



//

interface ButtonProps {
    text: string
    onClick: () => void
}

const Button: FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
        whileHover={{ background: '#4208B3', color: 'white'}}
        whileTap={{scale: 1.1}}
        transition={{duration: 0.07}}
        className={styles.button}
        onClick={onClick}>
            {text}
    </motion.button>
  )
}

export default Button