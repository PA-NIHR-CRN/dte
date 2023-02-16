import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import DTEHeader from "../../../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../../../../Shared/UI/DTETypography/DTEContent/DTEContent";
import DTELinkButton from "../../../../Shared/UI/DTELinkButton/DTELinkButton";

interface Props {
  onSubmit: () => void;
}

const RemoteStudy = (props: Props) => {
  const { onSubmit } = props;
  const { handleSubmit } = useForm({
    mode: "all",
  });

  return (
    <>
      <DTEHeader as="h1">Remote Study</DTEHeader>
      <DTEContent>Page content</DTEContent>
      <Grid container>
        <Grid item xs={12} sm={10} md={8} lg={7} xl={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DTELinkButton arrowIcon>Continue</DTELinkButton>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default RemoteStudy;
