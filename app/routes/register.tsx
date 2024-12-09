// REACT
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
// REMIX
import { ActionFunctionArgs } from "@remix-run/node";
import { Link, redirect, useFetcher } from "@remix-run/react";
// INTERNAL
import requestAccess, {
  AccessRequestResponse,
  AccessType,
  CreateAccountRequest,
} from "./actions/requestAccess";
import FormInput from "../components/Forms/FormInput/FormInput";
import FormButton from "../components/Forms/FormButton/FormButton";
// STYLES
import styles from "./styles/register.module.css";

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
  let error = "";
  const inputs = Object.fromEntries(
    await request.formData()
  ) as CreateAccountRequest;

  const response = (await requestAccess(
    AccessType.Register,
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

export default function UserRegistrationPage() {
  const { Form, data } = useFetcher();

  // Input Control
  const [inputs, setInputs] = useState<RegistrationInputs>(INITIAL_INPUTS);
  const [inputValidationMessages, setInputValidationMessage] =
    useState<RegistrationInputs>(INITIAL_INPUTS);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    setInputs({ ...inputs, [target.name]: target.value });
    setInputValidationMessage({
      ...inputValidationMessages,
      [target.name]: "",
    });
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

  const comparePasswords = () => {
    if (!inputs.confirmPassword.length) return;

    if (inputs.password !== inputs.confirmPassword)
      setInputValidationMessage({
        ...inputValidationMessages,
        confirmPassword: "Passwords must match.",
      });
  };

  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean>(true);
  const doesEmailExist = async () => {
    if (!inputs.email.length) return;

    const isEmailTaken = await fetch("http://localhost:8000/auth/checkEmail", {
      method: "POST",
      body: JSON.stringify({ email: inputs.email }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (isEmailTaken)
      setInputValidationMessage({
        ...inputValidationMessages,
        email: "Email is already taken.",
      });

    setIsEmailAvailable(!isEmailTaken);
  };

  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean>(true);
  const doesUsernameExist = async () => {
    if (!inputs.username.length) return;

    const isUsernameTaken = await fetch(
      "http://localhost:8000/xis/checkUsername",
      {
        method: "POST",
        body: JSON.stringify({ username: inputs.username }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (isUsernameTaken)
      setInputValidationMessage({
        ...inputValidationMessages,
        username:
          "Username is already taken. Try adding special characters or numbers.",
      });
    else {
      setInputValidationMessage({
        ...inputValidationMessages,
        username: `${inputs.username} is available!`,
      });

      setIsUsernameAvailable(!isUsernameTaken);
    }
  };

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
            {data as string}
          </p>
        </header>
        <section>
          <FormInput
            label="Email"
            id="emailInput"
            name="email"
            type="email"
            value={inputs.email}
            aria-invalid={!isEmailValid}
            validationMessage={
              !isEmailAvailable && inputs.email.length
                ? inputValidationMessages.email
                : ""
            }
            onBlur={doesEmailExist}
            handleChange={handleInputChange}
            required
          />
          <FormInput
            label="Username"
            id="usernameInput"
            name="username"
            value={inputs.username}
            aria-invalid={!isUsernameAvailable}
            validationMessage={
              inputs.username ? inputValidationMessages.username : ""
            }
            onBlur={doesUsernameExist}
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
            validationMessage={inputValidationMessages.password}
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
              inputs.confirmPassword.length
                ? inputValidationMessages.confirmPassword
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
