export const getProjects = async (token, all = true) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects?all=${all}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
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

export const createProject = async (token, project) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const updateProjectDetails = async (projectId, update, token) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
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