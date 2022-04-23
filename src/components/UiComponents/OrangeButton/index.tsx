import React from 'react';

import styles from "./YellowButton.module.scss";

interface YellowButtonProps {
    text: string,
    icon?: React.ReactNode,
    onClick?: (e: React.MouseEvent) => void;
}

export const OrangeButton: React.FC<YellowButtonProps> = React.memo(({text, icon, onClick}) => {
    return (
        <div onClick={onClick && onClick} className={styles.wrapper}>
            <button className={`${styles.btn}`}>
                {icon && <span>{icon}</span>}
                {text}
            </button>
        </div>
    );
})