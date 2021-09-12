import { useDispatch, useSelector } from 'react-redux';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import { updatePageContentState } from '../../../../state-management/actions/PageContentState.actions';

function ProjectNameRenderer(params) {

    const dispatch = useDispatch();

    const user = useSelector(state => state.auth);

    return (
        <>
            <span
                onClick={() => dispatch(updatePageContentState({
                    page: 'tasks',
                    attrs: {
                        project: params.data
                    }
                }))}
                style={{ cursor: 'pointer', color: 'blue' }}
            >
                {params.value}
                <sup>
                    <OpenInNewOutlinedIcon 
                        fontSize="inherit"
                    />
                </sup>
            </span>
            
        </>
    )
}

export default ProjectNameRenderer;
