import styled from "styled-components";
import { Control, Controller, useForm, UseFormSetValue } from "react-hook-form";
import React, { useEffect } from "react";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import DTEButton from "../../UI/DTEButton/DTEButton";
import DTEInput from "../../UI/DTEInput/DTEInput";
import { EmailRegex } from "../../../../Helper/Utils";
import PasswordShowHide from "../../Password/showHide";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

type UserLoginFormProps = {
  loadingLogin: boolean | undefined;
  control: Control<{ email: string; password: string }>;
  setValue: UseFormSetValue<{ email: string; password: string }>;
};

const UserLoginForm: React.FC<UserLoginFormProps> = ({
  loadingLogin,
  control,
  setValue,
}) => {
  return (
    <>
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
            value={value}
            onValueChange={(e) => setValue("password", e.target.value)}
            error={error?.message}
            label="Password"
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
    </>
  );
};

export default UserLoginForm;
