import React from 'react';

import styles from "./ToolTip.module.scss";

interface ToolTipProps {
    text: string,
    icon: React.ReactNode
}

export const ToolTip: React.FC<ToolTipProps> = React.memo(({text, icon}) => {
    return (
        <div className={styles.wrapper}>
            {icon}
            <span className={styles.text}>{text}</span>
        </div>
    );
})