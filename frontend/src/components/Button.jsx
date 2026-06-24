function Button({ onClick, label }) {
  return (
    <button onClick={onClick} type="button">
      {label}
    </button>
  );
}

export default Button;
