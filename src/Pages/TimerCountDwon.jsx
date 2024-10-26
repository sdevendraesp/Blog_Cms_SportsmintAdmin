import { useEffect, useState } from "react";

export const TimerCountDwon = (props) => {
    const [timer, setTimer] = useState(0);
    let { date } = props;
    let newDate = new Date(date);
    let todayDate = new Date();

    let secs = parseInt((newDate.getTime() - todayDate.getTime()) / 1000);

    let days = Math.floor(secs / (60 * 60 * 24));
    let divisor_for_hours = secs % (60 * 60 * 24);

    let hours = Math.floor(divisor_for_hours / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    useEffect(() => {
        let secs = 1;
        setInterval(() => {
            setTimer(secs++)
        }, 1000)
    }, [])


    if (parseInt(secs) < 0) {
        if (props?.timerClosed) {
            props?.timerClosed(true)
        }
    }

    return (
        <>
            {`${days > 0 ? days+'d :' : ''} ${hours > 0 ? hours+'h :' : ''} ${minutes > 0 ? minutes+'m :' : ''} ${seconds > 0 ? seconds+'s' : ''}`}
        </>
    );
}
