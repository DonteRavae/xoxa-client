// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// REMIX
import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
// INTERNAL
import { requestAccess } from "../actions";
import { AccessType, LoginRequest } from "../../data/types";
import FormInput from "../../components/Forms/FormInput/FormInput";
import FormButton from "../../components/Forms/FormButton/FormButton";
// STYLES
import styles from "../styles/login.module.css";

export const action = async ({ request }: ActionFunctionArgs) => {
  const inputs = Object.fromEntries(await request.formData()) as LoginRequest;

  try {
    const response = await requestAccess(inputs, AccessType.Login);
    if (response.status !== 200) {
      return await response.text();
    }

    const headers = new Headers();
    headers.append("Set-Cookie", response.headers.getSetCookie()[0]);
    headers.append("Set-Cookie", response.headers.getSetCookie()[1]);

    return redirect("/xc/feed", {
      headers,
    });
  } catch (error) {
    return "We apologize. There seems to be an error on our end. Please try again.";
  }
};

export default function LoginPage() {
  const data = useActionData<typeof action>();

  // Input Control
  const [inputs, setInputs] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.currentTarget;
    setInputs({ ...inputs, [target.name]: target.value });
  };

  // Focus Control
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <main className={styles.container}>
      <Form method="POST" action="/login">
        <header>
          <h1>Welcome back!</h1>
          <p>Ready to jump back in?</p>
        </header>
        <section>
          <FormInput
            id={styles["email-input"]}
            label="Email"
            name="email"
            ref={emailRef}
            value={inputs.email}
            errorMessage={data ? data : ""}
            handleChange={handleChange}
          />
          <FormInput
            id={styles["password-input"]}
            label={"Password"}
            name="password"
            type="password"
            errorMessage={data ? data : ""}
            value={inputs.password}
            handleChange={handleChange}
          />
          <Link
            to="/forgot-password"
            className={styles["forgot-password-link"]}
          >
            Forgot password?
          </Link>
        </section>
        <footer>
          <FormButton
            type="submit"
            disabled={!inputs.email || !inputs.password}
          >
            Log In
          </FormButton>
          <p>
            New around here?{" "}
            <span>
              <Link to="/register">Create an account.</Link>
            </span>
          </p>
        </footer>
      </Form>
    </main>
  );
}
