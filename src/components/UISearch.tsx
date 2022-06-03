import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

interface IProps {
    value: string;
    onChange: (e: any) => void; // TODO: update the methods
    onClick: () => void;
}

const UISearch:React.FC<IProps> = ({ value, onChange, onClick }) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
                fullWidth
                focused
                id="outlined-name"
                label="Cryptocurrency"
                value={value}
                onChange={onChange}
                type="search"
                variant="standard"
            />
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={onClick}>
                <SearchIcon />
            </IconButton>
        </Stack>
    )
}

export default UISearch