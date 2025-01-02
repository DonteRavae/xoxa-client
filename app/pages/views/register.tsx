// REACT
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// REMIX
import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
// INTERNAL
import { requestAccess } from "../actions";
import FormInput from "../../components/Forms/FormInput/FormInput";
import { AccessType, CreateAccountRequest } from "../../data/types";
import FormButton from "../../components/Forms/FormButton/FormButton";
import useInputAvailabilityCheck from "../../hooks/useInputAvailabilityCheck";
// STYLES
import styles from "../styles/register.module.css";

interface RegistrationInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_INPUTS: RegistrationInputs = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const inputs = Object.fromEntries(
    await request.formData()
  ) as CreateAccountRequest;

  try {
    const response = await requestAccess(inputs, AccessType.Register);
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

export default function UserRegistrationPage() {
  const data = useActionData<typeof action>();

  // Input Control
  const [inputs, setInputs] = useState<RegistrationInputs>(INITIAL_INPUTS);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (target.name === "email")
      emailAvailability.resetInputAvailabilityMessage();
    if (target.name === "username")
      usernameAvailability.resetInputAvailabilityMessage();
    setInputs({ ...inputs, [target.name]: target.value });
  };

  // Focus Control
  const emailRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  // Input Validation
  const isEmailValid = useMemo(
    () => /^[\w.]+@([\w-]+\.)+[\w-]{2,}$/.test(inputs.email),
    [inputs.email]
  );

  const isPasswordValid = useMemo(
    () =>
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/.test(
        inputs.password
      ),
    [inputs.password]
  );

  const doPasswordsMatch = useMemo(
    () => inputs.password === inputs.confirmPassword,
    [inputs.password, inputs.confirmPassword]
  );

  const [invalidPasswordMatchMessage, setInvalidPasswordMatchMessage] =
    useState<string>("");
  const comparePasswords = () => {
    if (!inputs.confirmPassword.length) return;

    if (inputs.password !== inputs.confirmPassword)
      setInvalidPasswordMatchMessage("Passwords must match.");
  };

  const emailAvailability = useInputAvailabilityCheck(
    "/auth/checkEmail",
    inputs.email,
    "Email is already taken."
  );

  const usernameAvailability = useInputAvailabilityCheck(
    "/xis/checkUsername",
    inputs.username,
    "Username is already taken. Try adding special characters or numbers."
  );

  return (
    <main className={styles.container}>
      <Form method="POST">
        <header>
          <h1>Join our community of developers!</h1>
          <Link to="/login"> Already have an account?</Link>
          <p
            className={`${styles["error-message"]} ${
              data ? styles.active : ""
            }`}
          >
            {data}
          </p>
        </header>
        <section>
          <FormInput
            label="Email"
            id="emailInput"
            name="email"
            type="email"
            ref={emailRef}
            value={inputs.email}
            aria-invalid={!isEmailValid}
            validationMessage={emailAvailability.inputAvailabilityMessage}
            onBlur={
              inputs.email.length ? emailAvailability.checkInput : undefined
            }
            handleChange={handleInputChange}
            required
          />
          <FormInput
            label="Username"
            id="usernameInput"
            name="username"
            value={inputs.username}
            aria-invalid={!usernameAvailability.isInputAvailable}
            validationMessage={usernameAvailability.inputAvailabilityMessage}
            onBlur={usernameAvailability.checkInput}
            handleChange={handleInputChange}
            required
          />
          <FormInput
            label="Password"
            id="passwordInput"
            name="password"
            type="password"
            value={inputs.password}
            information="Must include uppercase and lowercase letters, a number, and a special character."
            aria-invalid={!isPasswordValid}
            validationMessage={
              !isPasswordValid
                ? "Password must include uppercase and lowercase letters, a number, and a special character."
                : ""
            }
            handleChange={handleInputChange}
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            id="confirmPasswordInput"
            name="confirmPassword"
            value={inputs.confirmPassword}
            aria-invalid={!doPasswordsMatch}
            validationMessage={
              inputs.confirmPassword.length && invalidPasswordMatchMessage
                ? invalidPasswordMatchMessage
                : ""
            }
            onBlur={comparePasswords}
            handleChange={handleInputChange}
            required
          />
        </section>
        <footer>
          <FormButton
            type="submit"
            disabled={!isEmailValid || !isPasswordValid || !doPasswordsMatch}
          >
            {" "}
            Continue{" "}
          </FormButton>
          <p>
            By clicking continue, you agree to our{" "}
            <Link to="/terms">Terms of Service</Link> and{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>.
          </p>
        </footer>
      </Form>
    </main>
  );
}
