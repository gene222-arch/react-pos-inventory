import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import {css} from '@emotion/react'

const Loading = ({ isLoading = true }) => 
{
    const loaderStyled = css`
        position: fixed; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
    `;

	return (
		<> 
            <ScaleLoader css={loaderStyled} size='15' color={ '#90caf9' } loading={isLoading} />
        </>
	)

}

export default Loading;
