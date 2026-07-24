import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ShopContext } from "./ShopContext";

export const SocketContext = createContext();

export const SocketContextProvider = (props) => {
    const { backendUrl } = useContext(ShopContext);
    const [socket, setSocket] = useState(null);
    const [viewers, setViewers] = useState({});

    useEffect(() => {
        if (backendUrl) {
            const newSocket = io(backendUrl);
            setSocket(newSocket);

            newSocket.on("viewerUpdate", ({ productId, count }) => {
                setViewers((prev) => ({ ...prev, [productId]: count }));
            });

            return () => newSocket.close();
        }
    }, [backendUrl]);

    const joinProductRoom = (productId) => {
        if (socket) {
            socket.emit("joinProduct", productId);
        }
    };

    const leaveProductRoom = (productId) => {
        if (socket) {
            socket.emit("leaveProduct", productId);
        }
    };

    const value = {
        socket,
        viewers,
        joinProductRoom,
        leaveProductRoom
    };

    return (
        <SocketContext.Provider value={value}>
            {props.children}
        </SocketContext.Provider>
    );
};
