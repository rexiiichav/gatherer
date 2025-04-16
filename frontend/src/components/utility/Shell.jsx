import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Shell({ children }) {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <div class="h-full flex flex-col min-h-screen">
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            state={{ token: location.state.token }}
            to={`/`}
            class="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/berries.png" class="h-8" alt="Gatherer Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Gatherer
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {/* <li>
                <Link
                  to={`/`}
                  state={{ token: location.state.token }}
                  class="block py-2 px-3 text-black bg-green-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li> */}
              <li>
                <Link
                  to={`/recipes`}
                  state={{ token: location.state.token }}
                  class="block py-2 px-3 text-black bg-green-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  View Recipes
                </Link>
              </li>
              <li>
                <Link
                  to={`/recipe/create`}
                  state={{ token: location.state.token }}
                  class="block py-2 px-3 text-black bg-green-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Create Recipe
                </Link>
              </li>
              <li>
                <Link
                  to={`/list/create`}
                  state={{ token: location.state.token }}
                  class="block py-2 px-3 text-black bg-green-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Create List
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile`}
                  state={{ token: location.state.token }}
                  class="block py-2 px-3 text-black bg-green-700 rounded-sm md:bg-transparent md:text-white-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="grow w-100% min-h-100vh bg-gradient-to-r from-teal-200 to-lime-200">
        {children}
      </div>

      <footer class=" bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 Gatherer. All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
