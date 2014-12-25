import React, { useState, useEffect } from 'react';
import { Alert } from "@material-tailwind/react";

export default function AlertComponent({ status, message }) {
    const [open, setOpen] = React.useState(true);
    const messages = Array.isArray(message) ? message : [message];
    const [style, setStyle] = useState("red");

    useEffect(() => {
        if (status === "Success") {
            setStyle("green");
        }

        const timer = setTimeout(() => {
            setOpen(false);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [status, message]);
    return (
        <>
            <Alert
                open={open}
                onClose={() => setOpen(false)}
                animate={{
                    mount: { y: 0 },
                    unmount: { y: 100 },
                }}
                color={style}
                className='fixed right-4 bottom-8 max-w-[500px] w-[90%] z-40'
            >
                <p><strong>{`${status}:`}</strong> {messages}</p>
            </Alert>
        </>
    )
}
