import {FC} from 'react';
import {
    Route, Switch
} from 'react-router-dom';
import VideoPlayer from '../VideoPlayer';
import {RoutePath} from '../../enums/Routes';

const Routes: FC = () => {
    return (
        <Switch>
            <Route exact path={RoutePath.VideoPlayer} component={VideoPlayer}/>
            <Route exact path={RoutePath.Root} component={VideoPlayer} />
        </Switch>
    );
};

export default Routes;