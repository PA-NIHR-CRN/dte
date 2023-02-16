import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import useAxiosFetch from "../../../../../../hooks/useAxiosFetch";
import Utils from "../../../../../../Helper/Utils";
import DTEButton from "../../../../../Shared/UI/DTEButton/DTEButton";
import DTEHeader from "../../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import ErrorMessageContainer from "../../../../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import ErrorMessageSummary from "../../../../../Shared/ErrorMessageSummary/ErrorMessageSummary";
import PasswordShowHide from "../../../../../Shared/Password/showHide";
import ThreeWords from "../../../../../Shared/Password/threeWords";

export type PasswordFormData = {
  password: string;
  password2: string;
};

interface PasswordPolicy {
  minimumLength: number;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  requireUppercase: boolean;
  allowedPasswordSymbols?: string;
}

interface PasswordFormProps {
  initialStateData: PasswordFormData;
  onDataChange: (data: PasswordFormData) => void;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}

const PasswordForm = (props: PasswordFormProps) => {
  const { onDataChange, initialStateData, setLoading, setLoadingText } = props;
  let requirePolicyComma: boolean;
  let requireErrorMessageComma: boolean;
  let minLengthErrorOccured: boolean;
  let validationSuccess = true;
  let includesStatement = "";
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
      password: initialStateData.password,
      password2: initialStateData.password2,
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

  useEffect(() => {
    setLoadingText("Loading password policy...");
    setLoading(policyLoading || false);
  }, [setLoading, setLoadingText, policyLoading]);

  const requirementsConstructor = (
    constructor: string,
    clause: boolean,
    clauseText: string
  ) => {
    let returnedValue = constructor;
    if (clause) {
      if (requirePolicyComma) {
        returnedValue += ", ";
      }
      returnedValue += clauseText;
      requirePolicyComma = true;
    }
    return returnedValue;
  };

  const errorConstructor = (
    constructor: string,
    clause: boolean,
    commaClauseText: string,
    nonCommaClauseText: string,
    specialConstructor?: boolean
  ) => {
    let returnedValue = constructor;
    if (clause) {
      if (
        requireErrorMessageComma ||
        (minLengthErrorOccured && specialConstructor)
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
      requirements = requirementsConstructor(
        requirements,
        policy.requireUppercase,
        "1 capital letter"
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireLowercase,
        "1 lowercase letter"
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireNumbers,
        "1 number"
      );
      requirements = requirementsConstructor(
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

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <ErrorMessageContainer
        axiosErrors={[policyError]}
        DTEAxiosErrors={[
          Utils.ConvertResponseToDTEResponse(policyResponse)?.errors,
        ]}
      />
      {passwordPolicy && (
        <>
          <DTEHeader as="h1" $variant={headerVariant}>
            Create a password for your Be Part of Research account
          </DTEHeader>
          <DTEContent>{policyBuilder}</DTEContent>
          <ThreeWords />
          <Grid container>
            <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
              <form onSubmit={handleSubmit(onDataChange)} noValidate>
                <Controller
                  control={control}
                  name="password"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="password"
                      onValueChange={(e) =>
                        setValue("password", e.target.value)
                      }
                      error={error?.message}
                      label="Create your password"
                      required
                      autocomplete="new-password"
                      spellcheck={false}
                    />
                  )}
                  rules={{
                    required: { value: true, message: "Enter a password" },
                    validate: (value) => {
                      let passwordError = "Enter a password that ";
                      requireErrorMessageComma = false;
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
                        passwordError = errorConstructor(
                          passwordError,
                          !/[A-Z]/.test(value),
                          "at least 1 capital letter",
                          "at least 1 capital letter"
                        );
                      }
                      if (passwordPolicy.requireLowercase) {
                        passwordError = errorConstructor(
                          passwordError,
                          !/[a-z]/.test(value),
                          "1 lowercase letter",
                          "at least 1 lowercase letter"
                        );
                      }
                      if (passwordPolicy.requireNumbers) {
                        passwordError = errorConstructor(
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

                        passwordError = errorConstructor(
                          passwordError,
                          !regExSymbols.test(value),
                          "1 symbol",
                          "at least 1 symbol"
                        );
                      }

                      includesStatement = "";

                      passwordError = errorConstructor(
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
                        passwordError = errorConstructor(
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
                  name="password2"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="password2"
                      onValueChange={(e) =>
                        setValue("password2", e.target.value)
                      }
                      error={error?.message}
                      label="Confirm your password"
                      required
                      spellcheck={false}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: "Confirm the password",
                    },
                    validate: (value) => {
                      if (value === getValues().password) {
                        return true;
                      }
                      return "Enter the same password as above";
                    },
                  }}
                />
                <DTEButton>Continue</DTEButton>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default PasswordForm;
