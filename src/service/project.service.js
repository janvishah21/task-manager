import { getToken } from "../state-management/storeUtils";

export const getProjects = async (all = true) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects?all=${all}`, {
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

export const createProject = async (project) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(project)
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

export const updateProjectDetails = async (projectId, update) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ...update
            })
        });

        if (res.status !== 200)
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