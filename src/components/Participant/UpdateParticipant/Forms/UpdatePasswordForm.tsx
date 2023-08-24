import { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
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
import commonPasswords from "../../../../data/commonPassword";
import { ContentContext } from "../../../../context/ContentContext";

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

function UpdatePasswordForm(props: FormBaseProps) {
  const { content } = useContext(ContentContext);
  const { onCancel } = props;
  let requiresPolicyComma: boolean;
  let requireErrorMessageComma: boolean;
  let minLengthErrorOccured: boolean;
  let validationSuccess = true;
  let includesStatement = "";

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
    { useCache: false, manual: false },
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
    { useCache: false, manual: true },
  );

  const requirementsConstructor = (
    initialiser: string,
    clause: boolean,
    clauseText: string,
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

  const errorConstructor = (
    initialiser: string,
    clause: boolean,
    commaClauseText: string,
    nonCommaClauseText: string,
    specialInitialiser?: boolean,
  ) => {
    let returnedValue = initialiser;
    if (clause) {
      if (
        requireErrorMessageComma ||
        (minLengthErrorOccured && specialInitialiser)
      ) {
        returnedValue += `, ${includesStatement}${commaClauseText}`;
      } else {
        returnedValue += `${includesStatement}${nonCommaClauseText}`;
      }
      requireErrorMessageComma = true;
      includesStatement = "";
      validationSuccess = false;
    }
    return returnedValue;
  };

  useEffect(() => {
    if (policyResponse) {
      const policy = Utils.ConvertResponseToDTEResponse(
        policyResponse,
      ) as unknown as PasswordPolicy;
      let builder = `${content["register-password-policy-builder-char1"]} ${policy.minimumLength} ${content["register-password-policy-builder-char2"]}`;
      let requirements = "";
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements += content["register-password-policy-builder-include"];
      }
      requirements = requirementsConstructor(
        requirements,
        policy.requireUppercase,
        content["register-password-policy-builder-include-uppercase"],
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireLowercase,
        content["register-password-policy-builder-include-lowercase"],
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireNumbers,
        content["register-password-policy-builder-include-numbers"],
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireSymbols,
        content["register-password-policy-builder-include-symbols"],
      );
      if (
        policy.requireUppercase ||
        policy.requireLowercase ||
        policy.requireNumbers ||
        policy.requireSymbols
      ) {
        requirements = requirements.replace(
          /,([^,]*)$/,
          ` ${content["reusable-text-and"]}$1`,
        );
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
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    }).catch(() => {});
  };

  return (
    <>
      {policyLoading && (
        <LoadingIndicator text={content["reusable-password-policy-loading"]} />
      )}
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
            <LoadingIndicator
              text={content["reusable-loading-updating-details"]}
            />
          )}
          {(updateUserPasswordPostError ||
            Utils.ConvertResponseToDTEResponse(updateUserPasswordPostResponse)
              ?.errors) && (
            <ErrorMessageContainer
              description={content["update-password-error"]}
            >
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
                      label={content["update-password-input-current"]}
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
                      message:
                        content["update-password-validation-required-current"],
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
                      label={content["update-password-input-create"]}
                      required
                      autocomplete="new-password"
                      spellcheck={false}
                      buttonAriaLabelHide={
                        content["reusable-aria-hide-password"]
                      }
                      buttonAriaLabelShow={
                        content["reusable-aria-show-password"]
                      }
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: content["update-password-validation-new"],
                    },
                    validate: (value) => {
                      let passwordError = `${content["update-password-validation-new"]} ${content["reusable-text-that"]} `;
                      requireErrorMessageComma = false;
                      validationSuccess = true;
                      const regExMinLength = new RegExp(
                        `^.{${passwordPolicy.minimumLength},}$`,
                      );
                      if (!regExMinLength.test(value)) {
                        passwordError += `${content["reusable-text-is"]} ${content["register-password-policy-builder-at-least"]} ${passwordPolicy.minimumLength} ${content["register-password-policy-builder-char-long"]}`;
                        minLengthErrorOccured = true;
                        includesStatement = ` ${content["reusable-text-and"]} ${content["reusable-text-includes"]} `;
                        validationSuccess = false;
                      } else {
                        includesStatement = `${content["reusable-text-includes"]} `;
                      }

                      if (passwordPolicy.requireUppercase) {
                        passwordError = errorConstructor(
                          passwordError,
                          !/[A-Z]/.test(value),
                          `${content["register-password-policy-builder-at-least"]} ${content["register-password-policy-builder-include-uppercase"]}`,
                          `${content["register-password-policy-builder-at-least"]} ${content["register-password-policy-builder-include-uppercase"]}`,
                        );
                      }
                      if (passwordPolicy.requireLowercase) {
                        passwordError = errorConstructor(
                          passwordError,
                          !/[a-z]/.test(value),
                          `${content["register-password-policy-builder-include-lowercase"]}`,
                          `${content["register-password-policy-builder-at-least"]} ${content["register-password-policy-builder-include-lowercase"]}`,
                        );
                      }
                      if (passwordPolicy.requireNumbers) {
                        passwordError = errorConstructor(
                          passwordError,
                          !/\d/.test(value),
                          `${content["register-password-policy-builder-include-numbers"]}`,
                          `${content["register-password-policy-builder-at-least"]} ${content["register-password-policy-builder-include-numbers"]}`,
                        );
                      }
                      if (
                        passwordPolicy.requireSymbols &&
                        passwordPolicy.allowedPasswordSymbols
                      ) {
                        const regExSymbols = new RegExp(
                          `[\\${passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            "\\",
                          )}]`,
                        );

                        passwordError = errorConstructor(
                          passwordError,
                          !regExSymbols.test(value),
                          `${content["register-password-policy-builder-include-symbols"]}`,
                          `${content["register-password-policy-builder-at-least"]} ${content["register-password-policy-builder-include-symbols"]}`,
                        );
                      }

                      includesStatement = "";

                      passwordError = errorConstructor(
                        passwordError,
                        !/^[^ ]+$/.test(value),
                        content[
                          "register-password-policy-builder-include-no-spaces"
                        ],
                        content[
                          "register-password-policy-builder-include-no-spaces"
                        ],
                        true,
                      );

                      if (passwordPolicy.allowedPasswordSymbols) {
                        const regExIllegal = new RegExp(
                          `[^a-zA-Z0-9 \\${passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            "\\",
                          )}]`,
                        );
                        passwordError = errorConstructor(
                          passwordError,
                          regExIllegal.test(value),
                          `${content["register-password-policy-builder-symbol-list"]} ##allowedsymbols##`,
                          `${content["register-password-policy-builder-symbol-list"]} ##allowedsymbols##`,
                          true,
                        );
                      }

                      let finalErrorMessage = passwordError.replace(
                        /,([^,]*)$/,
                        ` ${content["reusable-text-and"]}$1`,
                      );

                      const isCommonPassword = commonPasswords.includes(
                        value.toLowerCase(),
                      );
                      if (isCommonPassword) {
                        finalErrorMessage += `. ${content["register-password-policy-builder-symbol-list"]}`;
                        validationSuccess = false;
                      }

                      if (passwordPolicy.allowedPasswordSymbols) {
                        finalErrorMessage = finalErrorMessage.replace(
                          `##allowedsymbols##`,
                          passwordPolicy.allowedPasswordSymbols.replace(
                            / /g,
                            "",
                          ),
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
                      label={content["update-password-input-confirm"]}
                      required
                      spellcheck={false}
                      buttonAriaLabelHide={
                        content["reusable-aria-hide-password-confirmation"]
                      }
                      buttonAriaLabelShow={
                        content["reusable-aria-show-password-confirmation"]
                      }
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message:
                        content["update-password-validation-confirm-password"],
                    },
                    validate: (value) => {
                      if (value === getValues().newPassword) {
                        return true;
                      }
                      return content[
                        "update-password-validation-same-password"
                      ];
                    },
                  }}
                />
                <FormNavigationButtons
                  nextButtonText={content["reusable-save"]}
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
}

export default UpdatePasswordForm;
