"use client";
import { useState } from "react";
import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage } = useSocket();
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div>All Message appear here</div>
      <div>
        <input
          className={classes["chat-input"]}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..."
        ></input>
        <button 
          className={classes["button"]} 
          onClick={(e) => sendMessage(msg)}>
          Send
        </button>
      </div>
    </div>
  );
}
