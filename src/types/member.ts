/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TeamMemberResponse {
  status: boolean;
  message: string;
  data: {
    team_members: TeamMember[];
  };
  errors: any[];
}

export interface TeamMember {
  invitation_code: string;
  invitation_status: "pending" | "accepted" | "declined"; 
  member_since: string | null;
  user: User;
}

interface User {
  first_name: string;
  id: number;
  uid: string;
  email: string;
  profile_image: string;
}






