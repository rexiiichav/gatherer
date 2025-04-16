export default function UsernameField({ label, value, set }) {
  return (
    <>
      <div class="max-w-sm mx-auto">
        <label
          for={label}
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type="email"
          id={label}
          aria-describedby="Enter your email."
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@domain.com"
          required
          value={value}
          onChange={(event) => {
            set(event.target.value);
          }}
        />
      </div>
    </>
  );
}
