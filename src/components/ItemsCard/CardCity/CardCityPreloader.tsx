import React from 'react';
import {Card, CardContent, Skeleton, Typography} from "@mui/material";

import styles from './CardCity.module.scss';

export const CardCityPreloader: React.FC = React.memo(() => {
    return (
        <div data-testid="city-preload" className={styles.wrapper}>
            <Card className={styles.wrapperCard}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        <Skeleton className={styles.headerSkeleton} variant="text"/>
                    </Typography>
                    <Typography variant="h1" color="secondary">
                        <Skeleton className={styles.bodySkeleton} variant="rectangular"/>
                    </Typography>
                    <Typography color="text.disabled" gutterBottom variant="h6" component="div">
                        <Skeleton className={styles.footerSkeleton} variant="text"/>
                    </Typography>
                    <div className={styles.iconsSkeleton}>
                        <Skeleton className={styles.iconSkeleton} variant="text"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
})