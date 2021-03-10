import { memo, FC } from 'react';
import {makeStyles, Box} from '@material-ui/core';
import Routes from '../Routes';

const useStyles = makeStyles(({
        appContainer: {
            display: 'block',
            width: 100,
            height: 100,
        }
    }
));

const MainContainer: FC = () => {
    const classes = useStyles();

    return (
        <Box data-testid="main-container" className={classes.appContainer}>
            <Routes/>
        </Box>
    );
};

export default memo(MainContainer);
