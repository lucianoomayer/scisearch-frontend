import { useState } from "react";
import { loginUser } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import AuthForm from './components/AuthForm'

export default function Login({onClose}) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const fields = [
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
        const data = await loginUser(email, password);
        login(data.token, { name: data.name });
        alert(`Login successful! Welcome ${data.name}`);
        onClose();       
    }catch(err){
        setMessage(err.message || "Login failed");
    }    
  };

  return (
    <AuthForm
      title="Login"
      fields={fields}
      onSubmit={handleSubmit}
      message={message}
      onClose={onClose}
      buttonLabel="Log In"
    />
  );
}

