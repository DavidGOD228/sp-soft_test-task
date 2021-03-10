import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({
        rangeInput: {
            '-webkit-appearance': 'none',
            width: '180px',
            borderRadius: '20px',
            margin: '6px 0',
            background: 'gray',
            '&:focus': {
                outline: 'none',

            },
        },
    }
));

type Props = {
    value?: string | number;
    step?: number;
    min?: number;
    max?: string | number;
    className?: string;
    onChange?: () => void;
};

const Range = forwardRef<HTMLInputElement, Props>(({
    value = '',
    step = 0.1,
    min = 0,
    max = 1,
    className = '',
    onChange = () => {},
}, inputRef) => {
    const classes = useStyles();

    const rangeClass = classes.rangeInput + (className ? ` ${className}` : '');

    return (
        <input
            type="range"
            className={rangeClass}
            ref={inputRef}
            onChange={onChange}
            value={value}
            step={0.1}
            min={min}
            max={max}
        />
    );
});

export default Range;
