import React from 'react';
import Button from '@mui/material/Button';

interface IProps {
  onClickHandler: () => void;
  label: string;
  variant?: "text" | "outlined" | "contained" | undefined;
}

const UILoader:React.FC<IProps> = ({ onClickHandler, label, variant = 'outlined' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Button variant={variant} onClick={onClickHandler}>{label}</Button>
    </div>
  );
}

export default UILoader