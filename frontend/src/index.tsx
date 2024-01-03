/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { Router, hashIntegration } from "@solidjs/router";
import { Auth0 } from "@rturnq/solid-auth0";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}



render(
  () => (
    <>
      <Auth0
        domain="dev-indy43k3akg7igov.us.auth0.com"
        clientId="AdkpMo0lql88Y9SCJzu3vbFkDMrNDbNC"
        logoutRedirectUri={`${window.location.origin}/logout`} // Absolute URI Auth0 logout redirect
        loginRedirectUri={`${window.location.origin}/#/pending`} // Absolute URI Auth0 login
      >
        <Router source={hashIntegration()}>
          <App />
        </Router>
      </Auth0>
    </>
  ),
  root!
);
