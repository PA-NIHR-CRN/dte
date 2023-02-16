import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { Radios } from "nhsuk-react-components";
import { useForm, Controller } from "react-hook-form";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";
import DTERadio from "../../../../Shared/UI/DTERadio/DTERadio";

export type SelectSiteData = Site;

type Site = {
  identifier: string;
  name: string;
  addressLine1: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  addressLine5?: string | null;
  postcode: string | null;
  studyId?: number | null;
  studySiteStatus?: string | null;
};
interface Props {
  onSubmit: (data: SelectSiteData) => void;
  initialStateData: SelectSiteData;
  sites: Site[];
}

const SelectSite = (props: Props) => {
  const { onSubmit, initialStateData, sites } = props;
  const { control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {
      studySite: initialStateData.identifier,
    },
  });

  const onSubmitHandler = (formData: { studySite: string }) => {
    const matchedSite = sites.find(
      (currentValue: Site) => currentValue.identifier === formData.studySite
    );
    if (matchedSite) {
      onSubmit({
        ...matchedSite,
      });
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Controller
              control={control}
              name="studySite"
              render={({ field: { value, onChange } }) => (
                <DTERadio
                  id="locationRadio"
                  name="locationRadio"
                  label={
                    <DTEHeader as="h1">
                      Select a research location that is convenient for you
                    </DTEHeader>
                  }
                  onChange={onChange}
                >
                  {sites.map((site: Site) => (
                    <Radios.Radio
                      key={uuidv4()}
                      value={site.identifier}
                      label={site.name}
                      defaultChecked={site.identifier === value}
                    >
                      <strong>{site.name}</strong> <br />
                      {[
                        site.addressLine1,
                        site.addressLine2,
                        site.addressLine3,
                        site.addressLine4,
                        site.addressLine5,
                        site.postcode,
                      ]
                        .filter((e: string | null | undefined) => e)
                        .join(", ") || "No address"}
                    </Radios.Radio>
                  ))}
                </DTERadio>
              )}
              rules={{
                validate: (value) => {
                  if (value === "") return "Please select a location";
                  return true;
                },
              }}
            />
            <DTELinkButton dark arrowIcon type="submit">
              Continue
            </DTELinkButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectSite;
