import { useAuth0 } from "@rturnq/solid-auth0";
import { Button } from "@suid/material";

const LoginButton = () => {
  const auth = useAuth0();
  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        class="px-9 py-3"
        onClick={() => auth?.loginWithRedirect()}
      >
        Log In
      </Button>
    </>
  );
};

export default LoginButton;
