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