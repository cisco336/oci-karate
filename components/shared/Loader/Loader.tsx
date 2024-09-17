import React from 'react';
import { ClimbingBoxLoader, RiseLoader } from 'react-spinners';

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <RiseLoader
        color={'#aaa'}
        loading={true}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={1}
      />
    </div>
  );
};
