import { useState } from "react";
import { registerUser } from "../../api";
import AuthForm from './components/AuthForm';

export default function Register({onClose}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const fields = [
    {
      type: "text",
      placeholder: "Name",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      type: "email",
      placeholder: "Email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      type: "password",
      placeholder: "Password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const data = await registerUser(name, email, password);
        alert("Registration successfully completed");
    }catch(err){
        setMessage(err.message || "Registration failed");
    }
  };

  return (
    <AuthForm
      title="Create Account"
      fields={fields}
      onSubmit={handleSubmit}
      message={message}
      onClose={onClose}
      buttonLabel="Sign Up"
    />
  );
}
