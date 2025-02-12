import { fetchWithAuthFormData, fetchWithAuth } from ".";

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


export { createTeamAction, deleteTeamAction };






