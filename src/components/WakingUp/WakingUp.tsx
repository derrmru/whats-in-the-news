import React, { useEffect, useRef, useState } from 'react'
import './WakingUp.css'

const WakingUp: React.FC = () => {
    const inc = useRef(0);
    const messages = [
        'Hold on a moment!',
        'This is a free project and our server goes to sleep after short periods of inactivity.',
        'This might take 5-10 seconds. Don\'t worry it\'s worth it.',
        'Good job for being so patient, such wow!'
    ]
    const [message, setMessage] = useState<string>(messages[inc.current]);

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(inc.current)
            setMessage(messages[inc.current]);
            inc.current += 1;
            inc.current === 4 ? inc.current = 0 : console.log('running');
        }, 2500);
        return () => clearInterval(interval);
      }, [messages, message]);

    return (
        <div className="waking-up">
            <div className="loading-icon">
                <div className="first-circle"></div>
            </div>
            <div>{message}</div>
        </div>
    )
}

export default WakingUp