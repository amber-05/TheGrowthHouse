"use client";

import { useActionState } from "react";
import { login } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="admin__card admin__login">
      <h1 className="h-lg">Admin sign in</h1>
      <label className="admin__field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" required autoFocus />
      </label>
      {state?.error && <p className="admin__error" role="alert">{state.error}</p>}
      <button className="btn" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
