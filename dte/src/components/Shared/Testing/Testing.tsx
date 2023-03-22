/* eslint-disable no-alert */
import {
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Link,
} from "@material-ui/core";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import EditIcon from "@material-ui/icons/Edit";
import { Radios } from "nhsuk-react-components";
import { Check } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ChangeEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import DTEPaper from "../UI/DTEPaper/DTEPaper";
import { Role } from "../../../types/AuthTypes";
import DTECheckBox from "../UI/DTECheckBox/DTECheckBox";
import DTECheckList from "../UI/DTECheckList/DTECheckList";
import DTEInput from "../UI/DTEInput/DTEInput";
import DTERadio from "../UI/DTERadio/DTERadio";
import DTEButton from "../UI/DTEButton/DTEButton";
import DTEBackLink from "../UI/DTEBackLink/DTEBackLink";
import DTEAccordion from "../UI/DTEAccordion/DTEAccordion";
import DTESelect from "../UI/DTESelect/DTESelect";
import DTEHeader from "../UI/DTETypography/DTEHeader/DTEHeader";
import DTEContent from "../UI/DTETypography/DTEContent/DTEContent";
import DTEForwardLookup from "../UI/DTEForwardLookup/DTEForwardLookup";
import DTERichTextEditor from "../UI/DTERichText/DTERichTextEditor";
import DTETable from "../UI/DTETable/DTETable";
import DTEDropdown, { DTEDropdownItem } from "../UI/DTEDropdown/DTEDropdown";
import DTELinkButton from "../UI/DTELinkButton/DTELinkButton";
import DTERouteLink from "../UI/DTERouteLink/DTERouteLink";
import DTEDetails from "../UI/DTEDetails/DTEDetails";
import DTERichTextRender from "../UI/DTERichText/DTERichTextRender";

function createData(name: string, url: string, linktype: Role) {
  return { name, url, linktype };
}

const rows = [
  createData("User Details", "/Participants/MyDetails", Role.Participant),
  // createData("Add Study", "/Researchers/Studies/Add", Role.Researcher),

  createData(
    "View All Studies and Study Requests",
    "/Admin/Studies",
    Role.Admin
  ),
  // createData("List All Studies", "/Admin/Studies", Role.Admin),

  createData("Create Account", "/UserRegistration", Role.None),
  createData("Participant Login", "/UserLogin", Role.None),
  createData("Logout", "/LogoutRedirect", Role.None),
  createData(
    "View Participants for Study",
    "/Researchers/Studies/:studyid/Participants",
    Role.Researcher
  ),
  createData(
    "View Participants for Study by Status",
    "/Researchers/Studies/:studyid/Participants/:statusid",
    Role.Researcher
  ),
  createData(
    "View Participants for Study by Site",
    "/Researchers/Studies/:studyid/Sites/:siteid/Participants",
    Role.Researcher
  ),
  createData("Your Studies", "/Researchers/Studies", Role.Researcher),
  createData(
    "View Study Details",
    "/Researchers/Study/:studyid",
    Role.Researcher
  ),
  createData(
    "Setup Study",
    "/Researchers/Study/:studyid/Setup",
    Role.Researcher
  ),
  createData("Registration flow start", "/Participants/register", Role.None),
  createData(
    "Registration flow stepper",
    "/Participants/register/questions",
    Role.None
  ),
  createData(
    "Continue Registration stepper",
    "/Participants/register/continue/questions",
    Role.Participant
  ),
  createData(
    "Contine self referral",
    "/Participants/SelfReferral/Continue/12345",
    Role.Participant
  ),
  createData(
    "Edit personal details",
    "/Participants/MyDetails",
    Role.Participant
  ),
];

function Testing() {
  const useStyles = makeStyles((theme) => ({
    grid: {
      width: "100%",
      margin: "0px",
    },
    paper: {
      padding: theme.spacing(3),
      color: theme.palette.text.secondary,
      border: 2,
      borderColor: theme.palette.nhsnavy.dark,
      margin: "auto",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
  const classes = useStyles();

  const handleEventBubble = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(e));
  };

  const handleEventBubbleArray = (e: any[]) => {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(e));
  };

  const handleChangeEvent = (e: ChangeEvent<any>) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };

  return (
    <>
      <DTEHeader as="h1" $variant="h1">
        Test Bed
      </DTEHeader>
      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <TableContainer component={DTEPaper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Page</TableCell>
                    <TableCell>Participant</TableCell>
                    <TableCell>Admin</TableCell>
                    <TableCell>Researcher</TableCell>
                    <TableCell>None</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <Link
                          component={RouterLink}
                          to={row.url}
                          underline="hover"
                        >
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {row.linktype === Role.Participant && <Check />}
                      </TableCell>
                      <TableCell>
                        {row.linktype === Role.Admin && <Check />}
                      </TableCell>
                      <TableCell>
                        {row.linktype === Role.Researcher && <Check />}
                      </TableCell>
                      <TableCell>
                        {row.linktype === Role.None && <Check />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DTEPaper>
        </Grid>
      </Grid>

      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <Grid item xs={12}>
              <DTEHeader as="h1" $variant="h1">
                H1 Header
              </DTEHeader>
              <DTEHeader as="h1" $variant="h1" $platform="mobile">
                H1 Header forced mobile
              </DTEHeader>
              <DTEHeader as="h1" $variant="h1" $platform="desktop">
                H1 Header forced desktop
              </DTEHeader>
              <DTEHeader as="h1" $variant="h1" $weight="normal">
                H1 Header Light
              </DTEHeader>
              <DTEHeader as="h2">H2 Header</DTEHeader>
              <DTEHeader as="h3">H3 Header</DTEHeader>
              <DTEHeader as="h4">H4 Header</DTEHeader>
            </Grid>
            <Grid container>
              <Grid item xs={2}>
                <DTEContent>Paragraph</DTEContent>
              </Grid>
              <Grid item xs={2}>
                <DTEContent as="strong">Strong</DTEContent>
              </Grid>
              <Grid item xs={2}>
                <DTEContent as="b">Bold</DTEContent>
              </Grid>
              <Grid item xs={2}>
                <DTEContent as="i">Italic</DTEContent>
              </Grid>
            </Grid>
          </DTEPaper>
        </Grid>
      </Grid>

      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <DTEHeader as="h1" $variant="h1">
              Input Elements
            </DTEHeader>
            <Grid container>
              <Grid item xs={12} sm={12} md={6}>
                <Grid item xs={12}>
                  <DTEInput
                    label="input"
                    onValueChange={(e) => handleChangeEvent(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DTEInput label="errorInput" error="This is an error" />
                </Grid>
                <Grid item xs={12}>
                  <DTECheckBox label="label" value="test1" />
                </Grid>
                <Grid item xs={12}>
                  <DTECheckList
                    id="checkbox"
                    name="checkbox"
                    label="Checkbox group label"
                    hint="This is a hint"
                    escKeyPressed={() => {}}
                    onValueChange={(e) => handleEventBubble(e)}
                    values={[
                      {
                        value: "1",
                        text: "one",
                        checked: false,
                        disabled: false,
                      },
                      {
                        value: "2",
                        text: "two",
                        checked: false,
                        disabled: true,
                        conditional: "this is the second option",
                      },
                      {
                        value: "3",
                        text: "three",
                        checked: true,
                        disabled: false,
                        conditional: "this is the third option",
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DTERadio
                    id="radiogroup1"
                    name="radiogroup1"
                    label={<>These are radio buttons</>}
                    hint="Test"
                  >
                    <Radios.Radio value="Hello">Hello world</Radios.Radio>
                    <Radios.Radio value="Brr">
                      Brrzt I&apos;m a robot
                    </Radios.Radio>
                    <DTEContent $radioList>or</DTEContent>
                    <Radios.Radio value="sugar">
                      Lend me some sugar
                    </Radios.Radio>
                  </DTERadio>
                </Grid>
                <Grid item xs={12}>
                  <DTERadio
                    id="radiogroup2"
                    name="radiogroup2"
                    label={<>These are pre-populated radio buttons</>}
                  >
                    <Radios.Radio value="Hello">Hello world</Radios.Radio>
                    <Radios.Radio value="Brr" defaultChecked>
                      Brrzt I&apos;m a robot
                    </Radios.Radio>
                  </DTERadio>
                </Grid>
                <Grid item xs={12}>
                  <DTERadio
                    id="radiogroupchildren"
                    name="radiogroupchildren"
                    label={<>How should we contact you</>}
                  >
                    <Radios.Radio
                      value="ConditionOne"
                      conditional={
                        <DTEInput
                          id="conditionalmobile"
                          name="conditionalmobile"
                          required
                          label="Mobile number"
                        />
                      }
                    >
                      Mobile
                    </Radios.Radio>
                    <Radios.Radio
                      value="ConditionTwo"
                      conditional={
                        <DTEInput
                          id="conditionallandline"
                          name="conditionallandline"
                          required
                          label="Landline number"
                          hint="Points of note for a landline"
                        />
                      }
                    >
                      I don&apos;t have a mobile
                    </Radios.Radio>
                  </DTERadio>
                </Grid>
                <Grid item xs={12}>
                  <DTEAccordion
                    id="accordion"
                    name="accordion"
                    sections={[
                      {
                        isDefault: true,
                        title: "Section One",
                        contentElements: [
                          {
                            text: "Content for first element",
                          },
                        ],
                      },
                      {
                        isDefault: false,
                        title: "Section Two",
                        contentElements: [
                          {
                            text: "Content for second element",
                          },
                          {
                            text: "Extra content for second element",
                          },
                        ],
                      },
                      {
                        isDefault: false,
                        title: "Section Three",
                        contentElements: [
                          {
                            text: "Content for third element",
                          },
                          {
                            text: "More content for third element",
                          },
                          {
                            text: "Lots more content for third element",
                          },
                        ],
                      },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DTESelect
                    id="select"
                    name="select"
                    label="Please choose"
                    hint="Hint for how to choose"
                    required={false}
                    options={[
                      {
                        value: "1",
                        text: "one",
                      },
                      {
                        value: "2",
                        text: "two",
                      },
                      {
                        value: "3",
                        text: "three",
                      },
                    ]}
                    onValueChange={(e) => handleChangeEvent(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DTEForwardLookup
                    id="test"
                    label="Research areas"
                    data={[
                      "Item 1",
                      "Item 2",
                      "Item 3",
                      "Item 4",
                      "Item 5",
                      "Item 6",
                      "Item 7",
                      "Item 8",
                      "Item 9",
                      "Item 10",
                    ]}
                    values={["Item 1", "Item 2"]}
                    hint="Enter your search term and select from results below"
                    onSelectedValuesChange={(e) => handleEventBubbleArray(e)}
                  />
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <DTERichTextEditor
                      id="editor"
                      label="Editor label"
                      hint="Input hint"
                      value="<p>Populated <strong>with </strong>data items</p><ul><li>list 1</li><li>list 2</li><li>list 3</li></ul><p></p><p><a href='https://www.google.com' target='_blank'>Link to another page</a></p>"
                      disabled
                      onValueChange={(e) => handleEventBubble(e)}
                    />
                  </Grid>
                  <Grid item xs={12} md={1} />
                  <Grid item xs={12} md={5}>
                    <DTERichTextRender
                      richText={JSON.stringify(
                        "<p>Populated <strong>with </strong>data items</p><ul><li>list 1</li><li>list 2</li><li>list 3</li></ul><p></p><p><a href='https://www.google.com' target='_blank'>Link to another page</a></p>"
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DTERichTextEditor
                    id="error-editor"
                    label="Editor label Error"
                    error="Error message"
                    onValueChange={(e) => handleEventBubble(e)}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DTEPaper>
        </Grid>
      </Grid>

      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <DTEHeader as="h1" $variant="h1">
              Display Elements
            </DTEHeader>
            <Grid container>
              <DTETable
                caption="Hello world"
                columns={[
                  { name: "One", width: 1 },
                  { name: "Two", width: 1 },
                  { name: "Three", width: 1 },
                ]}
                rows={[
                  { One: "Hello", Two: "World", Three: "Text" },
                  {
                    One: "Hello2",
                    Two: (
                      <DTERouteLink
                        to="https://example.com"
                        renderStyle="standard"
                        target="_blank"
                        external
                      >
                        This is an external link
                      </DTERouteLink>
                    ),
                    Three: (
                      <DTERouteLink to="testing" renderStyle="standard">
                        This is an internal link
                      </DTERouteLink>
                    ),
                  },
                  {
                    One: "Hello3",
                    Two: (
                      <DTEDropdown>
                        <DTEDropdownItem>
                          <EditIcon fontSize="small" />{" "}
                          <DTELinkButton
                            onClick={() => alert("Clicked edit document!")}
                            dark
                          >
                            Edit document
                          </DTELinkButton>
                        </DTEDropdownItem>
                        <DTEDropdownItem>
                          <OpenInNewIcon fontSize="small" />{" "}
                          <DTELinkButton
                            onClick={() => alert("Clicked archive document!")}
                            dark
                          >
                            Archive document
                          </DTELinkButton>
                        </DTEDropdownItem>
                      </DTEDropdown>
                    ),
                    Three: "",
                  },
                ]}
              />
            </Grid>
            <Grid container>
              <DTEDetails summary="Text to toggle details">
                <>
                  <p>Summary details text here</p>
                  <p>Can be any content</p>
                </>
              </DTEDetails>
            </Grid>
          </DTEPaper>
        </Grid>
      </Grid>

      <Grid container className={classes.paper}>
        <Grid item xs={12}>
          <DTEPaper className={classes.paper}>
            <DTEHeader as="h1" $variant="h1">
              RouteLink Elements
            </DTEHeader>
            <Grid container>
              <Grid item xs={3}>
                <DTERouteLink to="/testing">Button</DTERouteLink>
              </Grid>
              <Grid item xs={3}>
                <DTERouteLink to="/testing" $outlined>
                  Outlined
                </DTERouteLink>
              </Grid>
              <Grid item xs={2}>
                <DTERouteLink to="/testing" renderStyle="standard">
                  Standard
                </DTERouteLink>
              </Grid>
              <Grid
                item
                xs={1}
                style={{
                  backgroundColor: "#193e72",
                }}
              >
                <DTERouteLink to="/testing" renderStyle="standard" inverted>
                  Inverted
                </DTERouteLink>
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2}>
                <DTEBackLink
                  title="Return to previous enter your email address"
                  linkText="Back"
                  href="/"
                />
              </Grid>
            </Grid>
            <DTEHeader as="h1" $variant="h1">
              Button Elements
            </DTEHeader>
            <Grid container>
              <Grid item xs={2}>
                <DTEButton>Standard</DTEButton>
              </Grid>
              <Grid item xs={2}>
                <DTEButton $outlined>Outlined</DTEButton>
              </Grid>
              <Grid item xs={2}>
                <DTEButton disabled>Disabled</DTEButton>
              </Grid>
              <Grid item xs={2}>
                <DTEButton $danger>Danger</DTEButton>
              </Grid>
              <Grid item xs={4}>
                <DTEButton $fullwidth>Full Width</DTEButton>
              </Grid>
            </Grid>
            <DTEHeader as="h1" $variant="h1">
              Link Button Elements
            </DTEHeader>
            <Grid container>
              <Grid item xs={3}>
                <DTELinkButton>Standard</DTELinkButton>
              </Grid>
              <Grid item xs={3}>
                <DTELinkButton dark>Dark</DTELinkButton>
              </Grid>
              <Grid item xs={3}>
                <DTELinkButton disabled>Disabled</DTELinkButton>
              </Grid>
            </Grid>
          </DTEPaper>
        </Grid>
      </Grid>
    </>
  );
}

export default Testing;
