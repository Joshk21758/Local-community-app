export type PermitStatus = 'Pending' | 'Approved' | 'Rejected' | 'In Review';
export type PermitType = 'Building' | 'Event' | 'Business';

export type Permit = {
  id: string;
  type: PermitType;
  applicantName: string;
  dateSubmitted: string;
  status: PermitStatus;
  details: string;
  policyText: string;
};

export type Certificate = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
};

export type WasteForm = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
};
