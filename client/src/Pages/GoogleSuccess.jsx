import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';

const GoogleSuccess = () => {
  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const executedRef = useRef(false)

  useEffect(() => {
    if (executedRef.current) return;
    executedRef.current = true;
    const token = searchParams.get("token");
    const userParam = searchParams.get("user");
    const user = userParam ? JSON.parse(decodeURIComponent(userParam)) : null;

    if (token) {
      login(user, token, "",false);
      toast.success("Logged in successfully!");
      navigate("/home");
    } else {
      toast.error("Google login failed");
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-medium">
      Signing you in with Google...
    </div>
  );
};

export default GoogleSuccess;
