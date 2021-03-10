import { memo, FC, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { PlayIcon, PauseIcon, Range } from '../../UI';
import { toHHMMSS } from '../../helpers';

interface Props {
    videoSRC: string;
}

const useStyles = makeStyles(({
        videoPlayer: {
            position: 'relative',
            width: '500px',
            height: 'auto',
            display: 'block',
            margin: '75px auto',
        },
        time: {
            color: '#fff',
            fontSize: '12px',
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: '8px',
            width: '490px',
            padding: '4px 4px',
            borderRadius: '4px',
            background: 'rgba(30, 30, 30, .75)',
            transition: 'all .25s ease-out',
            '&:hover': {
                background: 'rgba(203, 133, 137, .75)',
            },
        },
        playPauseBtn: {
            outline: 'none',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            padding: '5px 15px',
            transition: 'all .15s ease-out',
            background: 'rgba(203, 133, 137, .5)',
        },
        svgPlayPauseBtn: {
            fill: '#fff',
            width: '25px',
            height: '25px',
            position: 'relative',
            top: '2px',
        },
        volumeRange: {
            width: '50px !important',
        }
    }
));

export const VideoPlayer: FC<Props> = ({videoSRC}) => {
    const classes = useStyles();

    const [paused, setPaused] = useState(true);
    const [length, setLength] = useState('0');
    const [formattedLength, setFormattedLength] = useState(toHHMMSS('0'));
    const [currentTime, setCurrentTime] = useState('0');
    const [formattedTime, setFormattedTime] = useState(toHHMMSS('0'));
    const [volume, setVolume] = useState(0.5);

    const videoComponentRef = useRef<HTMLVideoElement>(null);
    const timeRangeComponentRef = useRef<HTMLInputElement>(null);
    const volumeRangeComponentRef = useRef<HTMLInputElement>(null);

    const getAndSetDur = () => {
        if (!videoComponentRef || !videoComponentRef.current) {
            return length;
        }

        const dur = videoComponentRef.current.duration;
        const dur_str = dur.toFixed()
        let formattedLength = toHHMMSS(dur_str);

        setLength(dur_str);
        setFormattedLength(formattedLength);

        return dur_str;
    }

    const playHandler = () => {
        getAndSetDur();
        const v = videoComponentRef.current;

        setPaused(!paused);

        if (paused && v) {
            v.play();
            setPaused(false);
        } else if (v) {
            v.pause();
            setPaused(true);
        }
    }

    const getAndSetCurTime = () => {
        if (!videoComponentRef || !videoComponentRef.current) {
            return currentTime;
        }

        const cur = videoComponentRef.current.currentTime;
        const cur_str = cur.toFixed();

        let formattedTime = toHHMMSS(cur_str);
        setCurrentTime(cur_str);
        setFormattedTime(formattedTime);

        if (parseInt(currentTime) === parseInt(length)) {
            setPaused(paused)
        }

        return cur_str;
    }

    const customTimeHandler = () => {
        const time_range = timeRangeComponentRef.current;
        if (time_range && videoComponentRef.current) {
            const time_range_num = Number(time_range.value);
            const cur_str = time_range_num.toFixed();

            let formattedTime = toHHMMSS(cur_str);

            videoComponentRef.current.currentTime = time_range_num;
            setCurrentTime(cur_str);
            setFormattedTime(formattedTime);
        }
    }

    const customVolumeHandler = () => {
        const volume_range = volumeRangeComponentRef.current;

        if (volume_range && videoComponentRef.current) {
            const volume_range_num = Number(volume_range.value);

            videoComponentRef.current.volume = volume_range_num;
            setVolume(volume_range_num);
        }
    }

    useEffect(() => {
        let curTimeIntervalId: NodeJS.Timeout;
        let durIntervalId: NodeJS.Timeout;

        if (!paused) {
            customVolumeHandler();
            curTimeIntervalId = setInterval(() => setCurrentTime(getAndSetCurTime()), 500);
            durIntervalId = setInterval(() => setLength(getAndSetDur()), 500);
        }
        return () => {
            clearInterval(curTimeIntervalId);
            clearInterval(durIntervalId);
        };
    }, [paused]);

    return (
        <div data-testid="video-player-component" className={classes.videoPlayer}>

            <video data-testid="video-player" ref={videoComponentRef} onClick={playHandler} width="500" height="auto">
                <source src={videoSRC} type="video/mp4" />
            </video>

            <div className={classes.controls}>
                <button data-testid="play-pause-button" onClick={playHandler} className={classes.playPauseBtn}>
                    {paused ?
                        <PlayIcon className={classes.svgPlayPauseBtn}/> :
                        <PauseIcon className={classes.svgPlayPauseBtn}/>
                    }
                </button>
                <span className={classes.time}>
                    <span>{formattedTime}</span>
                    <span> / </span>
                    <span>{formattedLength}</span>
                </span>

                <Range
                    ref={timeRangeComponentRef}
                    onChange={customTimeHandler}
                    value={currentTime}
                    step={0.1}
                    min={0}
                    max={length}
                />

                <Range
                    className={classes.volumeRange}
                    ref={volumeRangeComponentRef}
                    onChange={customVolumeHandler}
                    value={volume}
                    step={0.1}
                    min={0}
                    max={1}
                />
            </div>
        </div>
    );
};

export default memo(VideoPlayer);