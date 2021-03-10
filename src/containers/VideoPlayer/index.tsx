import React, { memo, FC } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  VideoPlayer,
} from '../../components';

export const useStyles = makeStyles(({
  editorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 5%',
    height: '100%'
  },
  imgContainer: {
    border: '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0px 7px 49px rgba(202, 204, 213, 0.45)'
  },
}));

const VideoPlayerContainer: FC = () => {

  return (
    <>
      <VideoPlayer videoSRC="https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4" />
    </>
  );
};

export default memo(VideoPlayerContainer);
