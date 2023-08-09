import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect } from "react";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTEInput from "../../UI/DTEInput/DTEInput";
import Utils, { EmailRegex } from "../../../../Helper/Utils";
import PasswordShowHide from "../../Password/showHide";
import ErrorMessageSummary from "../../ErrorMessageSummary/ErrorMessageSummary";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

type FormData = {
  email: string;
  password: string;
};

type UserLoginFormProps = {
  loadingLogin: boolean | undefined;
  onSubmit: (formData: FormData) => void;
};

const UserLoginForm: React.FC<UserLoginFormProps> = ({
  loadingLogin,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    } else if (document.getElementsByClassName("error-summary")[0]) {
      document.getElementsByTagName("input")[0].focus();
    }
  }, [isSubmitting]);

  const localOnSubmit = (formData: FormData) => {
    onSubmit(formData);
  };

  useEffect(() => {
    setValue("password", "");
  }, [isSubmitting]);

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <form onSubmit={handleSubmit(localOnSubmit)} noValidate>
        <Controller
          control={control}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <DTEInput
              id="email"
              value={value}
              onValueChange={onChange}
              onValueBlur={onBlur}
              error={error?.message}
              label="Email address"
              required
              disabled={loadingLogin}
              type="email"
              spellcheck={false}
              autocomplete="username"
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Enter an email address",
            },

            pattern: {
              value: EmailRegex,
              message:
                "Enter an email address in the correct format, like name@example.com",
            },
          }}
        />
        <Controller
          control={control}
          name="password"
          render={({ fieldState: { error }, field: { value } }) => (
            <PasswordShowHide
              id="password"
              onValueChange={(e) => setValue("password", e.target.value)}
              error={error?.message}
              label="Password"
              value={value}
              required
              disabled={loadingLogin}
              spellcheck={false}
              autocomplete="current-password"
              buttonAriaLabelHide="Hide the entered password on screen"
              buttonAriaLabelShow="Show the entered password on screen"
            />
          )}
          rules={{
            required: {
              value: true,
              message: "Enter a password",
            },
          }}
        />
        <DTEContent>
          If you cannot remember your password, you can{" "}
          <DTERouteLink
            to="/ForgottenPassword"
            renderStyle="standard"
            ariaLabel="reset your password here"
          >
            reset it here.
          </DTERouteLink>
        </DTEContent>
        <ButtonWrapper>
          <DTEButton disabled={loadingLogin}>Sign in</DTEButton>
        </ButtonWrapper>
      </form>
    </>
  );
};

export default UserLoginForm;
