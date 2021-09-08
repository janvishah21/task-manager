export const login = async (email, password) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
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

export const signUp = async (user) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (res.status !== 201)
            return res;
    
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

export const logout = async (token, all = false) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout${all ? 'All' : ''}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.status !== 200)
            throw res;

        return {
            data: 'Logged Out !'
        };
    } catch (error) {
        return {
            error
        };
    }
}
