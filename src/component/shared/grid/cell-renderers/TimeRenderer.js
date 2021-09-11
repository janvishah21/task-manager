import dayjs from 'dayjs';

function TimeRenderer(params) {

    const date = dayjs(params.value);

    return (
        <>
            {date.format('YYYY-DD-MM hh:mm A')}
            <sup style={{ paddingLeft: '2px' }}>UTC{date.format('Z')}</sup>
        </>
    )
}

export default TimeRenderer;
