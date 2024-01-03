import { useAuth0 } from "@rturnq/solid-auth0";
import { useNavigate } from "@solidjs/router";
import { CircularProgress } from "@suid/material";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import {
  getUser
} from "../../services/user";
import BasicAppBar from "../navbar home/navbarHome";

const Pending = () => {
  const auth = useAuth0();
  const navigator = useNavigate();
  const [ticker, setTicker] = createSignal<number>(0);
  const [signup, setSignup] = createSignal<boolean | undefined>(undefined);

  createEffect(() => {
    const count = ticker();
    setInterval(() => {
      setTicker(count + 1);
    }, 500);
    if (auth?.isAuthenticated()) {
      clearInterval;
      isUserNew();
    }
  });
  const isUserNew = async () => {
    const user = await auth?.auth0Client()?.getUser();
    if (user) {
      const res1 = await getUser(user.sub, false);
      const res2 = await getUser(user.sub, true);
      console.info(res1, res2);
      if (res1 instanceof Error || res2 instanceof Error) {
        setSignup(true);
        return;
      }
      setSignup(false);
    }
  };

  return (
    <>
      <BasicAppBar />
      <Switch
        fallback={
          <div class="w-full h-screen flex flex-col self-center items-center justify-center">
            <CircularProgress />
          </div>
        }
      >
        <Match when={signup()}>
          <>{navigator("/signup")}</>
        </Match>
        <Match when={signup() === false}>
          <>{navigator("/home")}</>
        </Match>
      </Switch>
    </>
  );
};

export default Pending;
