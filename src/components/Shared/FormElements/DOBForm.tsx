import { useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fieldset } from "nhsuk-react-components";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { Controller, useForm } from "react-hook-form";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEDateInput from "../UI/DTEDateInput/DTEDateInput";
import FormBaseProps from "./FormBaseProps";
import FormNavigationButtons from "./CommonElements/FormNavigationButtons";
import ErrorMessageSummary from "../ErrorMessageSummary/ErrorMessageSummary";
import Utils from "../../../Helper/Utils";
import Honeypot from "../Honeypot/Honeypot";
import { ContentContext } from "../../../context/ContentContext";

export type DOBFormData = {
  day: string;
  month: string;
  year: string;
};

interface DOBFormProps extends FormBaseProps {
  initialStateData: DOBFormData;
  onDataChange: (data: DOBFormData) => void;
}

const StyledFieldset = styled(Fieldset)``;
const StyledFieldsetLegend = styled(Fieldset.Legend)``;

const DOBForm = (props: DOBFormProps) => {
  const {
    onDataChange,
    initialStateData,
    nextButtonText,
    hideInfo,
    hideHeader,
    showCancelButton,
    onCancel,
    instructionText,
  } = props;
  const { content } = useContext(ContentContext);
  const theme = useTheme();
  const headerVariant = useMediaQuery(theme.breakpoints.down("xs")) ? "h2" : "h1";
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors: formErrors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      dob: {
        day: initialStateData.day,
        month: initialStateData.month,
        year: initialStateData.year,
      },
    },
  });

  useEffect(() => {
    if (document.getElementsByClassName("nhsuk-error-message")[0]) {
      Utils.FocusOnError();
    }
  }, [isSubmitting]);

  const interceptSubmit = (data: any) => {
    onDataChange({
      day: data.dob.day,
      month: data.dob.month,
      year: data.dob.year,
    });
  };

  return (
    <>
      <ErrorMessageSummary renderSummary={!isSubmitting} errors={formErrors} />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <form onSubmit={handleSubmit(interceptSubmit)} noValidate onInvalid={() => {}}>
            <Honeypot />
            <StyledFieldset aria-describedby="date-of-birth-legend date-of-birth-hint">
              <StyledFieldsetLegend id="date-of-birth-legend">
                {!hideHeader && (
                  <DTEHeader as="h1" $variant={headerVariant}>
                    {content["register-date-of-birth-header"]}
                  </DTEHeader>
                )}
              </StyledFieldsetLegend>
              <div id="date-of-birth-hint">{instructionText || content["register-date-of-birth-body"]}</div>
              <Controller
                control={control}
                name="dob"
                render={({ field: { value, onChange }, fieldState: { error } }) =>
                  error !== undefined ? (
                    <DTEDateInput
                      id="dob"
                      error={
                        (
                          error as {
                            type: string;
                            message: string;
                            ref: { name: string };
                          }
                        )?.message
                      }
                      aria-describedby="dob--error-message"
                    >
                      <DTEDateInput.Day
                        label={content["reusable-text-day"]}
                        id="date-of-birth-day"
                        name="date-of-birth-day"
                        required
                        aria-required
                        aria-invalid
                        value={value.day}
                        autoComplete="bday-day"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 2)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: (e.target as HTMLInputElement).value,
                                  month: getValues().dob.month,
                                  year: getValues().dob.year,
                                },
                              },
                            });
                        }}
                      />
                      <DTEDateInput.Month
                        label={content["reusable-text-month"]}
                        id="date-of-birth-month"
                        name="date-of-birth-month"
                        required
                        aria-required
                        aria-invalid
                        value={value.month}
                        autoComplete="bday-month"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 2)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: getValues().dob.day,
                                  month: (e.target as HTMLInputElement).value,
                                  year: getValues().dob.year,
                                },
                              },
                            });
                        }}
                      />
                      <DTEDateInput.Year
                        label={content["reusable-text-year"]}
                        id="date-of-birth-year"
                        name="date-of-birth-year"
                        required
                        aria-required
                        aria-invalid
                        value={value.year}
                        autoComplete="bday-year"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 4)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: getValues().dob.day,
                                  month: getValues().dob.month,
                                  year: (e.target as HTMLInputElement).value,
                                },
                              },
                            });
                        }}
                      />
                    </DTEDateInput>
                  ) : (
                    <DTEDateInput id="date-of-birth">
                      <DTEDateInput.Day
                        label={content["reusable-text-day"]}
                        id="date-of-birth-day"
                        name="date-of-birth-day"
                        required
                        aria-required
                        aria-invalid={false}
                        value={value.day}
                        autoComplete="bday-day"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 2)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: (e.target as HTMLInputElement).value,
                                  month: getValues().dob.month,
                                  year: getValues().dob.year,
                                },
                              },
                            });
                        }}
                      />
                      <DTEDateInput.Month
                        label={content["reusable-text-month"]}
                        id="date-of-birth-month"
                        name="date-of-birth-month"
                        required
                        aria-required
                        aria-invalid={false}
                        value={value.month}
                        autoComplete="bday-month"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 2)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: getValues().dob.day,
                                  month: (e.target as HTMLInputElement).value,
                                  year: getValues().dob.year,
                                },
                              },
                            });
                        }}
                      />
                      <DTEDateInput.Year
                        label={content["reusable-text-year"]}
                        id="date-of-birth-year"
                        name="date-of-birth-year"
                        required
                        aria-required
                        aria-invalid={false}
                        value={value.year}
                        autoComplete="bday-year"
                        onChange={(e) => {
                          if ((e.target as HTMLInputElement).value.length <= 4)
                            onChange({
                              ...e,
                              target: {
                                ...e.target,
                                value: {
                                  day: getValues().dob.day,
                                  month: getValues().dob.month,
                                  year: (e.target as HTMLInputElement).value,
                                },
                              },
                            });
                        }}
                      />
                    </DTEDateInput>
                  )
                }
                rules={{
                  validate: (value) => {
                    // 1.2.2.1
                    if (value.day === "" && value.month === "" && value.year === "") {
                      return content["register-date-of-birth-validation-required"];
                    }

                    // 1.2.2.2 and 1.2.2.3
                    const missingFields = [
                      ...(value.day === "" ? [content["reusable-text-day"].toLowerCase()] : []),
                      ...(value.month === "" ? [content["reusable-text-month"].toLowerCase()] : []),
                      ...(value.year === "" ? [content["reusable-text-year"].toLowerCase()] : []),
                    ];
                    if (missingFields.length > 0) {
                      return `${content["register-date-of-birth-validation-required"]} ${missingFields.join(
                        ` ${content["reusable-text-and"]} `
                      )}`;
                    }

                    // 1.4
                    if (!/^\d+$/.test(value.day) || !/^\d+$/.test(value.month) || !/^\d+$/.test(value.year)) {
                      return content["register-date-of-birth-validation-invalid"];
                    }

                    // 1.2.3
                    const day = parseInt(value.day, 10);
                    const month = parseInt(value.month, 10);
                    const year = parseInt(value.year, 10);
                    const rangeErrors: string[] = [];
                    if (value.day === "" || day <= 0 || day > 31) {
                      rangeErrors.push(content["register-date-of-birth-validation-range-day"]);
                    }
                    if (value.month === "" || month <= 0 || month > 12) {
                      rangeErrors.push(content["register-date-of-birth-validation-range-month"]);
                    }
                    if (value.year === "" || year <= 1900) {
                      rangeErrors.push(content["register-date-of-birth-validation-range-year"]);
                    }
                    if (rangeErrors.length > 0) {
                      return rangeErrors.join(", ");
                    }

                    // 1.2.5
                    const d = new Date(year, month - 1, day);
                    if (
                      !(d instanceof Date && !Number.isNaN(d)) ||
                      !(d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day)
                    ) {
                      return content["register-date-of-birth-validation-invalid"];
                    }

                    // 1.2.6
                    const today = new Date();
                    let age = today.getFullYear() - d.getFullYear();
                    const m = today.getMonth() - d.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) {
                      age -= 1;
                    }
                    if (age < 18) {
                      return content["register-date-of-birth-validation-age"];
                    }
                    return true;
                  },
                }}
              />
            </StyledFieldset>
            {!hideInfo && content["register-date-of-birth"]}
            <FormNavigationButtons
              nextButtonText={nextButtonText || content["reusable-button-continue"]}
              showCancelButton={showCancelButton || false}
              cancelButtonText={content["reusable-cancel"]}
              onCancel={onCancel}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default DOBForm;
