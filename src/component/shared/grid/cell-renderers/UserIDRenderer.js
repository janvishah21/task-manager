import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../../../../store';

function UserIDRenderer(params) {
    
    const id = params.value.toLowerCase();

    const users = useSelector(state => state.users);

    return (
        <>
            {
                users[id]?.name ? users[id].name : params.value
            }
        </>
    )
}

export default UserIDRenderer;