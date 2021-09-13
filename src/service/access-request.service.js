export const getAccessRequests = async (token) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/access-requests`, {
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

export const raiseAccessRequest = async (request, token) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/access-requests`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                ...request
            })
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

export const updateAccessRequest = async (requestId, update, token) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/access-requests/${requestId}`, {
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