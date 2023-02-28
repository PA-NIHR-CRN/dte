import { useEffect, useState, useContext } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { AuthContext } from "../../../../context/AuthContext";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import Utils from "../../../../Helper/Utils";
import DTEHeader from "../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import ErrorMessageContainer from "../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../../Shared/LoadingIndicator/LoadingIndicator";
import FormNavigationButtons from "../../../Shared/FormElements/CommonElements/FormNavigationButtons";
import FormBaseProps from "../../../Shared/FormElements/FormBaseProps";
import ErrorMessageSummary from "../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../../../Shared/Password/showHide";
import ThreeWords from "../../../Shared/Password/threeWords";

export type UpdatePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface PasswordPolicy {
  minimumLength: number;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  requireUppercase: boolean;
  allowedPasswordSymbols?: string;
}

const UpdatePasswordForm = (props: FormBaseProps) => {
  const { onCancel } = props;
  let requiresPolicyComma: boolean;
  let requiresErrorMessageComma: boolean;
  let minLengthErrorOccured: boolean;
  let validationSuccess = true;
  let includesStatement = "";

  const { accessToken } = useContext(AuthContext);
  const history = useHistory();
  const [policyBuilder, setPolicyBuilder] = useState("");
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>();
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs"))
    ? "h2"
    : "h1";

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const [
    { response: policyResponse, loading: policyLoading, error: policyError },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      method: "GET",
    },
    { useCache: false, manual: false }
  );

  const [
    {
      response: updateUserPasswordPostResponse,
      loading: updateUserPasswordPostLoading,
      error: updateUserPasswordPostError,
    },
    updateUserPasswordPost,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { useCache: false, manual: true }
  );

  const requirementsBuilder = (
    initialiser: string,
    clause: boolean,
    clauseText: string
  ) => {
    let returnedValue = initialiser;
    if (clause) {
      if (requiresPolicyComma) {
        returnedValue += ", ";
      }
      returnedValue += clauseText;
      requiresPolicyComma = true;
    }
    return returnedValue;
  };

  const errorBuilder = (
    initialiser: string,
    clause: boolean,
    commaClauseText: string,
    nonCommaClauseText: string,
    specialInitialiser?: boolean
  ) => {
    let returnedValue = initialiser;
    if (clause) {
      if (
        requiresErrorMessageComma ||
        (minLengthErrorOccured && specialInitialiser)
      ) {
        returnedValue += `, ${includesStatement}${commaClauseText}`;
      } else {
        returnedValue += `${includesStatement}${nonCommaClauseText}`;
      }
      requiresErrorMessageComma = true;
      includesStatement = "";
      validationSuccess = false;
    }
    return returnedValue;
  };

  useEffect(() => {
    if (policyResponse) {
      const policy = Utils.ConvertResponseToDTEResponse(
        policyResponse
      ) as unknown as PasswordPolicy;
      let builder = `Your password must be ${policy.minimumLength} or more characters. You can use a mix of letters, numbers or symbols`;
      let requirements = "";
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements += " which must include at least ";
      }
      requirements = requirementsBuilder(
        requirements,
        policy.requireUppercase,
        "1 capital letter"
      );
      requirements = requirementsBuilder(
        requirements,
        policy.requireLowercase,
        "1 lowercase letter"
      );
      requirements = requirementsBuilder(
        requirements,
        policy.requireNumbers,
        "1 number"
      );
      requirements = requirementsBuilder(
        requirements,
        policy.requireSymbols,
        "1 symbol"
      );
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements = requirements.replace(/,([^,]*)$/, ` and$1`);
      }
      builder += `${requirements}.`;
      setPolicyBuilder(builder);
      setPasswordPolicy(policy);
    }
  }, [policyResponse]);

  useEffect(() => {
    if (
      Utils.ConvertResponseToDTEResponse(updateUserPasswordPostResponse)
        ?.isSuccess
    ) {
      history.push("/Participants/PasswordUpdated");
    }
  }, [updateUserPasswordPostResponse]);

  const submitForm = async (data: UpdatePasswordFormData) => {
    await updateUserPasswordPost({
      url: `${process.env.REACT_APP_BASE_API}/users/changepassword`,
      method: "POST",
      data: {
        accessToken,
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    }).catch(() => {});
  };

  return (
    <>
      {policyLoading && <LoadingIndicator text="Loading password policy..." />}
      {passwordPolicy && (
        <>
          <DTEHeader as="h1" $variant={headerVariant}>
            Change your password
          </DTEHeader>
          <ErrorMessageSummary
            renderSummary={!isSubmitting}
            errors={formErrors}
          />
          <ErrorMessageContainer
            axiosErrors={[policyError]}
            DTEAxiosErrors={[
              Utils.ConvertResponseToDTEResponse(policyResponse)?.errors,
            ]}
          />
          {updateUserPasswordPostLoading && (
            <LoadingIndicator text="Updating your details..." />
          )}
          {(updateUserPasswordPostError ||
            Utils.ConvertResponseToDTEResponse(updateUserPasswordPostResponse)
              ?.errors) && (
            <ErrorMessageContainer description="Your password has not been updated. You may not have entered the current password correctly or there may have been a technical issue.">
              <></>
            </ErrorMessageContainer>
          )}
          <DTEContent>{policyBuilder}</DTEContent>
          <ThreeWords />
          <Grid container>
            <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
              <form onSubmit={handleSubmit(submitForm)} noValidate>
                <Controller
                  control={control}
                  name="currentPassword"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="currentPassword"
                      onValueChange={(e) =>
                        setValue("currentPassword", e.target.value)
                      }
                      error={error?.message}
                      label="Current password"
                      required
                      autocomplete="current-password"
                      spellcheck={false}
                      buttonAriaLabelShow="Show the entered current password on screen"
                      buttonAriaLabelHide="Hide the entered current password on screen"
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Enter your current password",
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="newPassword"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="newPassword"
                      onValueChange={(e) =>
                        setValue("newPassword", e.target.value)
                      }
                      error={error?.message}
                      label="Create new password"
                      required
                      autocomplete="new-password"
                      spellcheck={false}
                      buttonAriaLabelHide="Hide the entered password on screen"
                      buttonAriaLabelShow="Show the entered password on screen"
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Enter a new password" },
                    validate: (value) => {
                      let passwordError = "Enter a new password that ";
                      requiresErrorMessageComma = false;
                      validationSuccess = true;
                      const regExMinLength = new RegExp(
                        `^.{${passwordPolicy.minimumLength},}$`
                      );
                      if (!regExMinLength.test(value)) {
                        passwordError += `is at least ${passwordPolicy.minimumLength} characters long`;
                        minLengthErrorOccured = true;
                        includesStatement = " and includes ";
                        validationSuccess = false;
                      } else {
                        includesStatement = "includes ";
                      }

                      if (passwordPolicy.requireUppercase) {
                        passwordError = errorBuilder(
                          passwordError,
                          !/[A-Z]/.test(value),
                          "at least 1 capital letter",
                          "at least 1 capital letter"
                        );
                      }
                      if (passwordPolicy.requireLowercase) {
                        passwordError = errorBuilder(
                          passwordError,
                          !/[a-z]/.test(value),
                          "1 lowercase letter",
                          "at least 1 lowercase letter"
                        );
                      }
                      if (passwordPolicy.requireNumbers) {
                        passwordError = errorBuilder(
                          passwordError,
                          !/\d/.test(value),
                          "1 number",
                          "at least 1 number"
                        );
                      }
                      if (
                        passwordPolicy.requireSymbols &&
                        passwordPolicy.allowedPasswordSymbols
                      ) {
                        const regExSymbols = new RegExp(
                          `[\\${passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            "\\"
                          )}]`
                        );

                        passwordError = errorBuilder(
                          passwordError,
                          !regExSymbols.test(value),
                          "1 symbol",
                          "at least 1 symbol"
                        );
                      }

                      includesStatement = "";

                      passwordError = errorBuilder(
                        passwordError,
                        !/^[^ ]+$/.test(value),
                        "does not include spaces",
                        "does not include spaces",
                        true
                      );

                      if (passwordPolicy.allowedPasswordSymbols) {
                        const regExIllegal = new RegExp(
                          `[^a-zA-Z0-9 \\${passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            "\\"
                          )}]`
                        );
                        passwordError = errorBuilder(
                          passwordError,
                          regExIllegal.test(value),
                          "only includes symbols from this list ##allowedsymbols##",
                          "only includes symbols from this list ##allowedsymbols##",
                          true
                        );
                      }

                      let finalErrorMessage = passwordError.replace(
                        /,([^,]*)$/,
                        ` and$1`
                      );

                      if (passwordPolicy.allowedPasswordSymbols) {
                        finalErrorMessage = finalErrorMessage.replace(
                          `##allowedsymbols##`,
                          passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            ""
                          )
                        );
                      }

                      return validationSuccess ? true : finalErrorMessage;
                    },
                  }}
                />
                <Controller
                  control={control}
                  name="confirmNewPassword"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="confirmNewPassword"
                      onValueChange={(e) =>
                        setValue("confirmNewPassword", e.target.value)
                      }
                      error={error?.message}
                      label="Confirm new password"
                      required
                      spellcheck={false}
                      buttonAriaLabelHide="Hide the entered password confirmation on screen"
                      buttonAriaLabelShow="Show the entered password confirmation on screen"
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Confirm the new password",
                    },
                    validate: (value) => {
                      if (value === getValues().newPassword) {
                        return true;
                      }
                      return "Enter the same new password as above";
                    },
                  }}
                />
                <FormNavigationButtons
                  nextButtonText="Save"
                  showCancelButton
                  onCancel={onCancel}
                />
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default UpdatePasswordForm;
