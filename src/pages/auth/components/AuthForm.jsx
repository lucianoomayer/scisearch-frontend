import "./AuthForm.css";

export default function AuthForm({ title, fields, onSubmit, message, onClose, buttonLabel }) {
  return (
    <div>
      <div className="authform-overlay"></div>
      <div className="authform-modal">
        <div className="authform-box">
          <h2>{title}</h2>
          <form onSubmit={onSubmit}>
            {fields.map((field, index) => (
              <input
                key={index}
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                onChange={field.onChange}
                required
              />
            ))}
            <button type="submit">{buttonLabel}</button>
          </form>
          {message && <p className="message">{message}</p>}
          <button onClick={onClose} className="close-button">X</button>
        </div>
      </div>
    </div>
  );
}