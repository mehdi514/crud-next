import React from 'react';

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <>
      {visible && (
        <div className="loader-backdrop">
          <div className="loader-spinner"></div>
        </div>
      )}
    </>
  );
};

export default Loader;
