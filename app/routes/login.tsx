// REACT
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
// REMIX
import { Link, useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
// INTERNAL
import requestAccess, {
  AccessRequestResponse,
  AccessType,
  LoginRequest,
} from "./actions/requestAccess";
import FormInput from "../components/Forms/FormInput/FormInput";
import FormButton from "../components/Forms/FormButton/FormButton";
// STYLES
import styles from "./styles/login.module.css";

export const action = async ({ request }: ActionFunctionArgs) => {
  let error = "";
  const inputs = Object.fromEntries(await request.formData()) as LoginRequest;
  const response = (await requestAccess(
    AccessType.Login,
    inputs
  )) as AccessRequestResponse;

  if (response.ok) {
    return redirect("/dashboard", {
      headers: response.headers,
    });
  }

  error = response.error!;
  return error;
};

export default function LoginPage() {
  const { Form, data } = useFetcher();

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
      <Form method="POST">
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
            errorMessage={data as string}
            handleChange={handleChange}
          />
          <FormInput
            id={styles["password-input"]}
            label={"Password"}
            name="password"
            type="password"
            errorMessage={data as string}
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
