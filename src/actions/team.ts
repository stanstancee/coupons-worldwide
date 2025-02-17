import { fetchWithAuthFormData, fetchWithAuth } from ".";

interface TeamInviteData {
    email: string;
    invitation_code: string;
}

const createTeamAction = async (data: FormData) => {
    const response = await fetchWithAuthFormData("business/teams/add-member", data, 'POST', 'teams');
    return response;
}

const deleteTeamAction = async (data: {
    user_uid: string;
    business_uid: string;
}) => {
    const response = await fetchWithAuth(`business/teams/remove?user_uid=${data.user_uid}&business_uid=${data.business_uid}`, {}, 'DELETE', 'teams');
    return response;
}



const inviteTeamAction = async (data: TeamInviteData) => {
    const response = await fetchWithAuth("business/teams/accept-invite", data, 'POST', 'teams');
    return response;
}




export { createTeamAction, deleteTeamAction, inviteTeamAction };







