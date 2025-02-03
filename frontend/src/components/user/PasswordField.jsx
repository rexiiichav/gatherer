export default function PasswordField({ label, value, set }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="password"
        value={value}
        onChange={(event) => {
          set(event.target.value);
        }}
      />
    </>
  );
}
