import { getToken } from "../state-management/storeUtils";

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

export const logout = async (all = false) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/logout${all ? 'All' : ''}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
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

export const getAvatar = async (userId) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/${userId}/avatar`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (res.status !== 200)
            throw res;

        const data = await res.blob();

        return {
            data
        };
    } catch (error) {
        return {
            error
        };
    }
}

export const getUsers = async (search = '', active = true, limit = 10) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/users?active=${active}&search=${search}&limit=${limit}`, {
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

export const getUsersByIdList = async (idList = [], active = false) => {
    try {
        if (!idList || !idList.length)
            return {
                data: []
            };

        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/usersByIdList?active=${active ? active : ''}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                ids: idList
            })
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