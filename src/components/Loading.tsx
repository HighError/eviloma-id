import React from 'react';
import { RingSpinner } from 'react-spinners-kit';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <RingSpinner size={30} color="#5620c0" />
    </div>
  );
};

export default Loading;
