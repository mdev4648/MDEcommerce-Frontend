import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useRefreshTokenMutation } from "./authApi";

const PersistLogin = ({ children }) => {

  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const verifyRefreshToken = async () => {

      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        setLoading(false);
        return;
      }

      try {

        const res = await refreshToken(refresh).unwrap();

        dispatch(
          setCredentials({
            access: res.access,
            refresh: refresh
          })
        );

      } catch (err) {
        console.error("Session expired");
      }

      setLoading(false);
    };

    verifyRefreshToken();

  }, []);

  if (loading) return <p>Loading...</p>;

  return children;
};

export default PersistLogin;