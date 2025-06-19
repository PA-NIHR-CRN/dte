import styled from "styled-components";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import React, { useContext } from "react";
import DTEContent from "../../UI/DTETypography/DTEContent/DTEContent";
import DTERouteLink from "../../UI/DTERouteLink/DTERouteLink";
import DTEInput from "../../UI/DTEInput/DTEInput";
import { EmailRegex } from "../../../../Helper/Utils";
import PasswordShowHide from "../../Password/showHide";
import { ContentContext } from "../../../../context/ContentContext";
import DTEButton from "../../UI/DTEButton/DTEButton";

const ButtonWrapper = styled.div`
  margin-top: 1rem;
`;

type UserLoginFormProps = {
  loadingLogin: boolean | undefined;
  control: Control<{ email: string; password: string }>;
  setValue: UseFormSetValue<{ email: string; password: string }>;
};

const UserLoginForm: React.FC<UserLoginFormProps> = ({ loadingLogin, control, setValue }) => {
  const { content } = useContext(ContentContext);
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
          <DTEInput
            id="email"
            value={value}
            onValueChange={onChange}
            onValueBlur={onBlur}
            error={error?.message}
            label={content["reusable-text-email-address"]}
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
            message: content["reusable-email-validation-required"],
          },

          pattern: {
            value: EmailRegex,
            message: content["reusable-email-validation-invalid-format"],
          },
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ fieldState: { error } }) => (
          <PasswordShowHide
            id="password"
            onValueChange={(e) => setValue("password", e.target.value)}
            error={error?.message}
            label={content["reusable-text-password"]}
            required
            disabled={loadingLogin}
            spellcheck={false}
            autocomplete="current-password"
            buttonAriaLabelHide={content["reusable-aria-hide-password"]}
            buttonAriaLabelShow={content["reusable-aria-show-password"]}
          />
        )}
        rules={{
          required: {
            value: true,
            message: content["reusable-password-validation-required"],
          },
        }}
      />
      <DTEContent>
        {content["forgotten-password-pre-link-text"]}
        <DTERouteLink to="/ForgottenPassword" renderStyle="standard" ariaLabel={content["signin-aria-reset-password"]}>
          {content["reusable-forgotten-password-link-text"]}
        </DTERouteLink>
        {content["forgotten-password-post-link-text"]}
      </DTEContent>
      <ButtonWrapper>
        <DTEButton disabled={loadingLogin}>{content["reusable-button-signin"]}</DTEButton>
      </ButtonWrapper>
    </>
  );
};

export default UserLoginForm;
