/* import React, { useEffect, useState } from "react";

import { AiOutlineLoading3Quarters, AiOutlineCheck } from "react-icons/ai";
import { RiForbidLine } from "react-icons/ri";

import MailchimpSubscribe from "react-mailchimp-subscribe";

const CustomForm = ({ status, onValidated }) => {
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (status === "success") setEmail("");
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    email && email.indexOf("@") > -1 && onValidated({ EMAIL: email });
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

const MailchimpForm = () => {
  const url =
    "hosarne.us20.list-manage.com/subscribe/post?u=7139b166a7f7eb01c32dfeaf3&id=e884ff573e";

  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
};

export default MailchimpForm;
 */
