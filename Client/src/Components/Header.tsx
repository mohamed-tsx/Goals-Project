import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../app/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const onLogOut = () => {
    dispatch(logout() as any);
    dispatch(reset());
    navigate("/");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to={"/"}>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogOut}>
              <FaSignOutAlt />
              LogOut
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to={"/register"}>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
