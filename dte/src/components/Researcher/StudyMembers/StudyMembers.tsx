import { Container, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import { useHistory, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState, useRef, createRef } from "react";
import Utils from "../../../Helper/Utils";
import useAxiosFetch from "../../../hooks/useAxiosFetch";
import ErrorMessageContainer from "../../Shared/ErrorMessageContainer/ErrorMessageContainer";
import LoadingIndicator from "../../Shared/LoadingIndicator/LoadingIndicator";
import DTEButton from "../../Shared/UI/DTEButton/DTEButton";
import DTEFlourish from "../../Shared/UI/DTEFlourish/DTEFlourish";
import DTEHeader from "../../Shared/UI/DTETypography/DTEHeader/DTEHeader";
import DTETable from "../../Shared/UI/DTETable/DTETable";
import DTEDropdown, {
  DTEDropdownItem,
} from "../../Shared/UI/DTEDropdown/DTEDropdown";
import DTELinkButton from "../../Shared/UI/DTELinkButton/DTELinkButton";
import DTEConfirmationBox, {
  DTEConfirmationBoxText,
} from "../../Shared/UI/DTEConfirmationBox/DTEConfirmationBox";
import AddMemberForm from "./AddMemberForm";
import StudyDetailsHeader from "../../Shared/StudyDetailsHeader/StudyDetailsHeader";

const PaddedContainer = styled(Container)`
  padding-top: 2rem;
`;

const HeaderContainer = styled.div`
  padding-top: 2rem;
`;

type Member = {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  studyId: number;
  role: string;
};

interface StudyMembersProps {
  studyid: string;
}

const StudyMembers = () => {
  const { studyid } = useParams<StudyMembersProps>();
  const history = useHistory();
  const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
  const [memberToDelete, setMemberToDelete] = useState<Member>();
  const [deletedMember, setDeletedMember] = useState<Member>();
  const location = useLocation();

  const [{ response, loading, error }, getParticipants] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/researcherstudies/studies/${studyid}`,
      method: "GET",
    },
    { manual: false, useCache: false }
  );

  const [
    { response: getRoleResponse, loading: getRoleLoading, error: getRoleError },
  ] = useAxiosFetch(
    {
      url: `${process.env.REACT_APP_BASE_API}/researcherstudies/${studyid}`,
      method: "GET",
    },
    { manual: false, useCache: false }
  );

  const [
    {
      response: changeRoleResponse,
      loading: changeRoleLoading,
      error: changeRoleError,
    },
    changeRole,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { manual: true }
  );
  const [
    {
      response: deleteMemberResponse,
      loading: deleteMemberLoading,
      error: deleteMemberError,
    },
    deleteMember,
  ] = useAxiosFetch(
    {
      method: "POST",
    },
    { manual: true }
  );
  let refs: any;
  if (Utils.ConvertResponseToDTEResponse(response)?.isSuccess) {
    refs = useRef(
      Array.from(
        {
          length:
            Utils.ConvertResponseToDTEResponse(response)?.content.items.length,
        },
        () => createRef()
      )
    );
  } else {
    refs = useRef([]);
  }
  const refreshParticipants = () => {
    getParticipants();
  };

  const handleDeleteMember = async () => {
    setConfirmDeletion(false);
    deleteMember(
      {
        url: `${process.env.REACT_APP_BASE_API}/researcherstudies/${studyid}/researcher/${memberToDelete?.userId}`,
        method: "DELETE",
      },
      { useCache: false, manual: true }
    )
      .catch(() => {})
      .then(() => {
        setDeletedMember(memberToDelete);
        refreshParticipants();
      });
  };

  const generateRows = (members: Member[]) =>
    members.map((member: Member, j: number) => {
      return {
        Name:
          !member?.firstname && !member?.lastname
            ? "No name provided"
            : `${member?.firstname || ""} ${member?.lastname || ""}`,
        "Email address": member?.email || "No email provided",
        Permissions:
          member?.role
            ?.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
            .split(" ")
            .map((word, i) => (i > 0 ? word.toLowerCase() : word))
            .join(" ") || "",
        Actions: (
          <DTEDropdown
            ref={(el) => {
              refs.current[j] = el;
            }}
          >
            <DTEDropdownItem>
              <EditIcon fontSize="small" />{" "}
              <DTELinkButton
                onClick={() => handleUpdateMemberRole(member)}
                dark
              >
                Change permission to{" "}
                {member.role === "StudyTeamAdmin"
                  ? "study team member"
                  : "study team admin"}
              </DTELinkButton>
            </DTEDropdownItem>
            <DTEDropdownItem>
              <DeleteIcon fontSize="small" />{" "}
              <DTELinkButton
                onClick={() => {
                  refs.current[j]?.toggle();
                  setMemberToDelete(member);
                  setConfirmDeletion(true);
                  window.scrollTo(0, 0);
                }}
                dark
              >
                Remove from study
              </DTELinkButton>
            </DTEDropdownItem>
          </DTEDropdown>
        ),
      };
    });

  const generateColumns = (role: string) => [
    { name: "Name", width: 1.2 },
    { name: "Email address", width: 1.5 },
    { name: "Permissions", width: 1 },
    // Only show column if they're an admin
    ...(role === "StudyTeamAdmin" ? [{ name: "Actions", width: 0.5 }] : []),
  ];

  const handleUpdateMemberRole = async (member: Member) => {
    changeRole(
      {
        url: `${process.env.REACT_APP_BASE_API}/researcherstudies/${studyid}/researcher/${member?.userId}`,
        data: {
          role: member.role === "StudyTeamAdmin" ? 2 : 1,
        },
        method: "PUT",
      },
      { useCache: false, manual: true }
    )
      .catch(() => {})
      .then(() => {
        window.scrollTo(0, 0);
        refreshParticipants();
      });
  };

  return (
    <>
      <StudyDetailsHeader studyid={studyid} title={location?.state?.title} />
      <PaddedContainer maxWidth="lg" role="main">
        <DTEButton
          onClick={() => history.push(`/Researchers/Study/${studyid}`)}
          $outlined
          $backArrow
          $small
        >
          Back to study dashboard
        </DTEButton>
        {(loading || getRoleLoading) && (
          <LoadingIndicator text="Loading members..." />
        )}
        {changeRoleLoading && <LoadingIndicator text="Updating role..." />}
        {deleteMemberLoading && <LoadingIndicator text="Deleting Member..." />}
        <ErrorMessageContainer
          axiosErrors={[
            error,
            getRoleError,
            changeRoleError,
            deleteMemberError,
          ]}
          DTEAxiosErrors={[
            Utils.ConvertResponseToDTEResponse(getRoleResponse)?.errors,
            Utils.ConvertResponseToDTEResponse(response)?.errors,
            Utils.ConvertResponseToDTEResponse(changeRoleResponse)?.errors,
            !deleteMemberResponse?.data?.errors[0]?.httpResponseString.includes(
              "Unable to modify your own account"
            )
              ? Utils.ConvertResponseToDTEResponse(deleteMemberResponse)?.errors
              : undefined,
          ]}
        />

        {response &&
          getRoleResponse &&
          !changeRoleLoading &&
          !deleteMemberLoading &&
          Utils.ConvertResponseToDTEResponse(response)?.isSuccess &&
          Utils.ConvertResponseToDTEResponse(getRoleResponse)?.isSuccess && (
            <>
              <HeaderContainer>
                <DTEHeader as="h1" $color="blue">
                  Team members
                </DTEHeader>
              </HeaderContainer>

              <DTEFlourish />
              {deleteMemberResponse &&
                deleteMemberResponse?.data?.errors[0]?.httpResponseString.includes(
                  "Unable to modify your own account"
                ) && (
                  <DTEConfirmationBox
                    aria-labelledby="confirmation-title"
                    role="alert"
                  >
                    <DTEConfirmationBox.Title id="confirmation-title">
                      Unable to remove from the study
                    </DTEConfirmationBox.Title>
                    <DTEConfirmationBox.Body>
                      <DTEConfirmationBoxText>
                        As the only study admin assigned to the study, you are
                        not able to remove yourself from the study. You must
                        assign another study admin before removing yourself.
                      </DTEConfirmationBoxText>
                    </DTEConfirmationBox.Body>
                  </DTEConfirmationBox>
                )}
              {deleteMemberResponse &&
                Utils.ConvertResponseToDTEResponse(deleteMemberResponse)
                  ?.isSuccess && (
                  <DTEConfirmationBox $success>
                    <DoneIcon /> {deletedMember?.email || "This user"} has been
                    removed from the study
                  </DTEConfirmationBox>
                )}
              {confirmDeletion && (
                <DTEConfirmationBox
                  aria-labelledby="confirmation-title"
                  role="alert"
                >
                  <DTEConfirmationBox.Title id="confirmation-title">
                    Remove team member
                  </DTEConfirmationBox.Title>
                  <DTEConfirmationBox.Body>
                    <DTEConfirmationBoxText>
                      Are you sure you want to remove{" "}
                      {memberToDelete?.email || "this member"} from the study?
                    </DTEConfirmationBoxText>
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <DTEButton $danger onClick={() => handleDeleteMember()}>
                          Yes, remove this person
                        </DTEButton>
                      </Grid>
                      <Grid item>
                        <DTELinkButton
                          onClick={() => setConfirmDeletion(false)}
                        >
                          Cancel
                        </DTELinkButton>
                      </Grid>
                    </Grid>
                  </DTEConfirmationBox.Body>
                </DTEConfirmationBox>
              )}

              {getRoleResponse &&
                Utils.ConvertResponseToDTEResponse(getRoleResponse)
                  ?.isSuccess &&
                Utils.ConvertResponseToDTEResponse(getRoleResponse)?.content
                  ?.role === "StudyTeamAdmin" && (
                  <AddMemberForm refreshParticipants={refreshParticipants} />
                )}

              <DTETable
                rows={generateRows(
                  Utils.ConvertResponseToDTEResponse(response)?.content.items
                )}
                columns={generateColumns(
                  Utils.ConvertResponseToDTEResponse(getRoleResponse)?.content
                    ?.role
                )}
              />
            </>
          )}
      </PaddedContainer>
    </>
  );
};

export default StudyMembers;
