import { FC } from 'react';
import Navbar from './Navbar';

const Wrapper: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Wrapper;
