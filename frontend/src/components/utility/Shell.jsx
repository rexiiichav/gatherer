import { Link } from "react-router";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Shell({ children }) {
  let location = useLocation();
  let navigate = useNavigate();

  return (
    <div class="w-100% min-h-full bg-gradient-to-r from-teal-200 to-lime-200">
      {children}
    </div>
  );
}
