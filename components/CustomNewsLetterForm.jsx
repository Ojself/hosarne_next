import React, { useState } from "react";

import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { RiForbidLine } from "react-icons/ri";
import axios from "axios";

const CustomNewsLetterForm = ({}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const timeOutStatus = (newStatus = "error") => {
    setStatus(newStatus);
    setTimeout(() => {
      setStatus("idle");
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      return timeOutStatus();
    }
    setStatus("sending");
    try {
      await axios.post("/api/newsletter", { email });
      timeOutStatus("success");
    } catch (err) {
      timeOutStatus("error");
    }
  };

  return (
    <form style={{ zIndex: 250 }} onSubmit={handleSubmit}>
      <label
        style={{ lineHeight: "1px" }}
        className='font-thin text:xs lg:text-sm'
      >
        Nyhetsbrev: <br /> (Mail)
        <input
          type='text'
          style={{ backgroundColor: "transparent" }}
          id='email-input'
          className='w-1/4 lg:w-1/3 lg:ml-2 text-xs lg:text-lg focus:border-green-500 outline-none border-black border-t-0 border-l-0 border-r-0 border z-100'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {status === "sending" && (
          <AiOutlineLoading3Quarters className='text-blue-500 inline animate-spin' />
        )}
        {status === "success" && (
          <AiOutlineCheck className='text-green-500 inline ' />
        )}
        {status === "error" && <RiForbidLine className='inline' color='red' />}
      </label>
      {status === "error" && <p className='text-red-700'> Noe gikk galt </p>}
      <br />
    </form>
  );
};

export default CustomNewsLetterForm;
