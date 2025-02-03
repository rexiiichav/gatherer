export default function UsernameField({ label, value, set }) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type="text"
        value={value}
        onChange={(event) => {
          set(event.target.value);
        }}
      />
    </>
  );
}
