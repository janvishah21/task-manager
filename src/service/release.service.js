export const getReleases = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/releases`, {
            method: 'GET',
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