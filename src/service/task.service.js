import { getToken } from "../state-management/storeUtils";

export const getTasks = async (projectId, all = true) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/tasks`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!res.ok)
            throw res;

        const data = await res.json();

        return {
            data
        };
    } catch (error) {
        return {
            error
        };
    }
}

export const createTask = async (projectId, task) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/tasks`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(task)
        });

        if (res.status !== 201)
            throw res;
    
        const data = await res.json();

        return {
            data
        };
    } catch (error) {
        return {
            error
        };
    }
}