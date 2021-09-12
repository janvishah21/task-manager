export const getTasks = async (projectId, token, all = true) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/projects/${projectId}/tasks`, {
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