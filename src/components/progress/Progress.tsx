import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

type Props = {
    className?: string
};

export default function Progress({className = ''}: Props) {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 100;
                }
                const diff = 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <LinearProgress className={className} variant="determinate" value={progress}/>
    );
}
