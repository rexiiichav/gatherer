export default function Error({ errors }) {
  return (
    <>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </>
  );
}
