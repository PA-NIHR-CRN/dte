export interface PasswordPolicy {
  minimumLength: number;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  requireUppercase: boolean;
  allowedPasswordSymbols?: string;
  weakPasswords: string[];
}

const validatePassword = (
  value: string,
  passwordPolicy: PasswordPolicy,
  content: { [x: string]: any },
  isNew = false
) => {
  const passwordErrors = [];
  let validationSuccess = true;

  const regExMinLength = new RegExp(`^.{${passwordPolicy.minimumLength},}$`);
  if (!regExMinLength.test(value)) {
    passwordErrors.push(
      `${content["register-password-policy-builder-least-chars-long"].replace(
        "{{chars}}",
        passwordPolicy.minimumLength
      )}`
    );
    validationSuccess = false;
  }

  if (passwordPolicy.requireUppercase && !/[A-Z]/.test(value)) {
    passwordErrors.push(`${content["register-password-policy-builder-includes-lowercase"]}`);
    validationSuccess = false;
  }

  if (passwordPolicy.requireLowercase && !/[a-z]/.test(value)) {
    passwordErrors.push(`${content["register-password-policy-builder-includes-capital"]}`);
    validationSuccess = false;
  }

  if (passwordPolicy.requireNumbers && !/\d/.test(value)) {
    passwordErrors.push(`${content["register-password-policy-builder-includes-number"]}`);
    validationSuccess = false;
  }

  if (passwordPolicy.requireSymbols && passwordPolicy.allowedPasswordSymbols) {
    const regExIllegal = new RegExp(`[^a-zA-Z0-9 \\${passwordPolicy.allowedPasswordSymbols.replace(/ /g, "\\")}]`);

    const regExSymbols = new RegExp(`[\\${passwordPolicy.allowedPasswordSymbols.replace(/ /g, "\\")}]`);
    if (regExIllegal.test(value)) {
      passwordErrors.push(
        `${content["register-password-policy-builder-symbol-list"]} ${passwordPolicy.allowedPasswordSymbols}`
      );
      validationSuccess = false;
    } else if (!regExSymbols.test(value)) {
      passwordErrors.push(`${content["register-password-policy-builder-symbol-includes"]}`);
      validationSuccess = false;
    }
  }

  if (!/^[^ ]+$/.test(value)) {
    passwordErrors.push(`${content["register-password-policy-builder-include-no-spaces"]}`);
    validationSuccess = false;
  }

  const strippedPassword = value.replace(/[^a-zA-Z]/g, "");
  if (passwordPolicy.weakPasswords.includes(strippedPassword.toLowerCase())) {
    passwordErrors.push(`${content["register-password-policy-builder-common-passwords"]}`);
    validationSuccess = false;
  }

  let finalErrorMessage = isNew
    ? `${content["register-password-policy-builder-enter-password-new"]}\n`
    : `${content["register-password-policy-builder-enter-password"]}\n`;
  passwordErrors.forEach((error, index) => {
    finalErrorMessage += `• ${error}`;
    if (index < passwordErrors.length - 1) {
      finalErrorMessage += "\n";
    }
  });

  return validationSuccess ? true : finalErrorMessage;
};

export default validatePassword;
