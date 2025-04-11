import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
  const ws = useRef(null);
  const [socket, setSocket] = useState(null); // This is key

  useEffect(() => {
    // Guard against double connections
    if (ws.current) return;

    const socketInstance = new WebSocket("ws://localhost:9000");

    socketInstance.onopen = () => {
      console.log("WebSocket connected");
    };

    socketInstance.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socketInstance.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.current = socketInstance;
    setSocket(socketInstance); // Only set after it's created

    return () => {
      if (socketInstance.readyState === 1) {
        socketInstance.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};
