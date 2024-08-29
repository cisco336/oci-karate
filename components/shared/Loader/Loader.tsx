import React from 'react';
import { ClimbingBoxLoader, RiseLoader } from 'react-spinners';

export const Loader = () => {
    return (
        <RiseLoader
            color={'#aaa'}
            loading={true}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={2}
        />
    );
};
