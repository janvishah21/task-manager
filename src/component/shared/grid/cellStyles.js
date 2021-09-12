export const accessRequestStatusStyler = params => {
    const status = params.data.status;
    switch(status) {
        case 'Approved':
            return { color: 'green' }
        case 'Rejected':
            return { color: 'red' }
        case 'Closed':
            return { color: 'grey' }
        default:
            return {}
    }
}