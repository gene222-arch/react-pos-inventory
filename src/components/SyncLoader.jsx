import React from 'react'
import SYNCLOADER from 'react-spinners/SyncLoader'
import {css} from '@emotion/react'

const SyncLoader = ({ isLoading = true }) => 
{
    const loaderStyled = css`
        position: relative; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%);
    `;

	return (
		<> 
            <SYNCLOADER css={loaderStyled} size='15' color={ '#90caf9' } loading={isLoading} />
        </>
	)

}

export default SyncLoader;
