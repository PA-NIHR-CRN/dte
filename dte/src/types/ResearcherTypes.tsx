// The any types need to be implemented explicitly in future.
export interface Study {
  studyCpmsId: string;
  irasId?: number;
  isrctnId?: number;
  studyTitle?: string;
  studySetupDate?: string;
  leadResearcher?: string;
  rtsId?: string;
  studyArmId?: string;
  studyArmDescription?: string;
  eligibilityCriteria?: string;
  studyStageId?: string;
  studyStageDescription?: string;
  studyActivityId?: string;
  studyActivityDescription?: string;
  questionnaire?: any;
  tasks?: any;
  notifications?: any;
  createdBy?: string;
  created?: string;
  lastModifiedBy?: string;
  lastModified?: string;
  sites?: Site[];
  status?: number;
}

export interface Site {
  id: string;
  participants?: Participant[];
}

export enum StudyStatesEnum {
  "Awaiting Approval" = 0,
  "Rejected" = 1,
  "Approved" = 2,
}

export interface StudyState {
  Name: string;
  Id: number;
}

export interface StudyRequest {
  studyId: string;
  title: string;
  shortName: string;
  researcher: {
    firstname: string;
    lastname: string;
    email: string;
  };
  studyRegistrationStatus: string;
}

export interface CPMSIdSearchResponse {
  id: number;
  shortName: string;
  title: string;
}

export interface Participant {
  studyId: string;
  siteId: string;
  participantId: string;
  participantRegistrationStatus: ParticipantStatus;
  updatedAtUtc: string;
  submittedAtUtc: string;
  participantDetails: ParticipantDetails;
  participantDemographics: ParticipantDemographics;
}

export interface ParticipantDetails {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export interface ParticipantDemographics {
  dateOfBirth: string;
  ethnicity: string;
  gender: string;
  sex: string;
}

export enum ParticipantStatus {
  applied = "Applied",
  screening = "Screening",
  notSelected = "Not Selected",
}

export interface ProgressParticipantCommand {
  data: {
    correlationId: string;
    studyId: string;
    siteId: string;
    userId: string;
    status: ParticipantStatus;
  };
}

export interface ApproveStudyRequestCommand {
  data: {
    correlationId: string;
    studyId: string;
  };
}
export interface RejectStudyRequestCommand {
  data: {
    correlationId: string;
    studyId: string;
  };
}

export type StudySite = {
  studyId: number;
  studySiteStatus: string;
  name: string;
  identifier: string;
  type: string;
  parentOrganisation?: any;
  status: string;
  effectiveStartDate: Date;
  effectiveEndDate?: any;
  createdDate: Date;
  modifiedDate: Date;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  addressLine5: string;
  postcode: string;
  ukCountryIdentifier?: any;
  ukCountryName?: any;
};
