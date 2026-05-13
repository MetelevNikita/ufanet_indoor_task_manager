import { FC } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image';

// icon

import { BiSolidMessageSquareDetail } from "react-icons/bi";


// styles

import styles from './MenuButton.module.css'

// icons

import { IoArrowForward } from "react-icons/io5";
import { StaticImageData } from 'next/image';


interface MenuButtonProps {
    title: string,
    subtitle: string,
    icon: React.ReactNode
    onClick: () => void
}

const MenuButton: FC<MenuButtonProps> = ({ title, subtitle, icon, onClick }) => {
  return (
    <motion.div
        className={styles.menu_button_container}
        whileHover={{backgroundColor: '#4208B3', color: '#fbf9ff',}}
        whileTap={{scale: 1.1}}
        transition={{duration: 0.05}}
        onClick={onClick}

    >

            {/*  */}

            <div className={styles.menu_button_top_wrapper}>
                <div className={styles.menu_button_title}>{title}</div>
                <div className={styles.menu_button_subtitle}>{subtitle}</div>
            </div>
            
            {/*  */}

            <div className={styles.menu_button_bottom_wrapper}>

                {
                    (icon) ? icon : <BiSolidMessageSquareDetail className={styles.menu_button_basic_image}/>
                }

            
                <div className={styles.menu_button_bottom_arrow_container}>
                    <IoArrowForward className={styles.menu_button_bottom_arrow}/>
                </div>
            </div>

    </motion.div>
  )
}

export default MenuButton