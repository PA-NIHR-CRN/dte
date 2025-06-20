import { useContext, useEffect, useState } from "react";
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
import { ContentContext } from "../../../../../../context/ContentContext";
import Honeypot from "../../../../../Shared/Honeypot/Honeypot";
import validatePassword, { PasswordPolicy } from "../../../../../../Helper/passwordValidation/passwordValidation";

export type PasswordFormData = {
  password: string;
  password2: string;
};

interface PasswordFormProps {
  initialStateData: PasswordFormData;
  onDataChange: (data: PasswordFormData) => void;
  setLoading: (loading: boolean) => void;
  setLoadingText: (text: string) => void;
}

function PasswordForm(props: PasswordFormProps) {
  const { content } = useContext(ContentContext);
  const { onDataChange, initialStateData, setLoading, setLoadingText } = props;
  let requirePolicyComma: boolean;
  const [localFormData, setLocalFormData] = useState<PasswordFormData>({
    password: "",
    password2: "",
  });
  const [policyBuilder, setPolicyBuilder] = useState("");
  const [passwordPolicy, setPasswordPolicy] = useState<PasswordPolicy>();
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
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

  const [{ response: policyResponse, loading: policyLoading, error: policyError }] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/users/passwordpolicy`,
      method: "GET",
    },
    { useCache: false, manual: false }
  );

  useEffect(() => {
    setLoadingText(content["reusable-password-policy-loading"]);
    setLoading(policyLoading || false);
  }, [setLoading, setLoadingText, policyLoading]);

  const requirementsConstructor = (constructor: string, clause: boolean, clauseText: string) => {
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

  useEffect(() => {
    if (policyResponse) {
      const policy = Utils.ConvertResponseToDTEResponse(policyResponse) as unknown as PasswordPolicy;
      let builder = `${content["register-password-policy-builder-char1"]} ${policy.minimumLength} ${content["register-password-policy-builder-char2"]}`;
      let requirements = "";
      if (policy.requireUppercase || policy.requireLowercase || policy.requireNumbers || policy.requireSymbols) {
        requirements += content["register-password-policy-builder-include"];
      }
      requirements = requirementsConstructor(
        requirements,
        policy.requireUppercase,
        content["register-password-policy-builder-include-uppercase"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireLowercase,
        content["register-password-policy-builder-include-lowercase"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireNumbers,
        content["register-password-policy-builder-include-numbers"]
      );
      requirements = requirementsConstructor(
        requirements,
        policy.requireSymbols,
        content["register-password-policy-builder-include-symbols"]
      );
      if (policy.requireUppercase || policy.requireLowercase || policy.requireNumbers || policy.requireSymbols) {
        requirements = requirements.replace(/,([^,]*)$/, ` ${content["reusable-text-and"]}$1`);
      }
      builder += `${requirements}.`;
      setPolicyBuilder(builder);
      setPasswordPolicy(policy);
    }
  }, [policyResponse]);

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const handleValueChange = (field: keyof PasswordFormData, value: string) => {
    setValue(field, value);
    setLocalFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <ErrorMessageContainer
        axiosErrors={[policyError]}
        DTEAxiosErrors={[Utils.ConvertResponseToDTEResponse(policyResponse)?.errors]}
      />
      {passwordPolicy && (
        <>
          <DTEHeader as="h1" $variant={headerVariant} captionKey="register-password-header">
            {content["register-password-header"]}
          </DTEHeader>
          <DTEContent>{content["register-password-policy"]}</DTEContent>
          <Grid>
            <form onSubmit={handleSubmit(onDataChange)} noValidate>
              <Honeypot />
              <Grid xs={12} sm={10} md={8} lg={7} xl={6}>
                <Controller
                  control={control}
                  name="password"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="password"
                      onValueChange={(e) => handleValueChange("password", e.target.value)}
                      error={error?.message}
                      label={content["reusable-password-input-create"]}
                      required
                      autocomplete="new-password"
                      spellcheck={false}
                      buttonAriaLabelHide={content["reusable-aria-hide-password"]}
                      buttonAriaLabelShow={content["reusable-aria-show-password"]}
                      value={localFormData.password}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: content["reusable-password-validation-required"],
                    },
                    validate: (value) => validatePassword(value, passwordPolicy, content),
                  }}
                />
                <Controller
                  control={control}
                  name="password2"
                  render={({ fieldState: { error } }) => (
                    <PasswordShowHide
                      id="password2"
                      onValueChange={(e) => handleValueChange("password2", e.target.value)}
                      error={error?.message}
                      label={content["reusable-password-input-confirm"]}
                      required
                      spellcheck={false}
                      buttonAriaLabelHide={content["reusable-aria-hide-password-confirmation"]}
                      buttonAriaLabelShow={content["reusable-aria-show-password-confirmation"]}
                      value={localFormData.password2}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: content["reusable-validation-confirm-password"],
                    },
                    validate: (value) => {
                      if (value === getValues().password) {
                        return true;
                      }
                      return content["reusable-validation-same-password"];
                    },
                  }}
                />
              </Grid>
              <Grid container direction="column" spacing={3}>
                <Grid item>{content["create-password-page"]}</Grid>
              </Grid>
              <DTEButton>{content["reusable-button-continue"]}</DTEButton>
            </form>
          </Grid>
        </>
      )}
    </>
  );
}

export default PasswordForm;
