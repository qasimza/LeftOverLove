import { useAuth0 } from "@rturnq/solid-auth0";
import LoginButton from "./loginButton";

const Login = () => {
  const auth = useAuth0();

  return (
    <>
      <div class="w-full h-screen bg-center bg-contain bg-logo">
        <div class="absolute right-0 bottom-0 m-20">
          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default Login;
