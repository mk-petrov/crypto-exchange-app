import React from 'react';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
// import InputAdornment from "@material-ui/core/InputAdornment";

interface IProps {
    value: string;
    onChange: (e: any) => void;
    onClick: () => void;
    onClear?: (e: string) => void;
}

const ENTER_KEY = 13

const UISearch:React.FC<IProps> = ({ value, onChange, onClick, onClear }) => {

    const handleKeyPress = (e: any) => {
        if (ENTER_KEY === e.keyCode) {
            onClick();
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
                onKeyUp={handleKeyPress}
                fullWidth
                focused
                id="outlined-name"
                label=""
                placeholder="Search for a cryptocurrency exchange pair"
                value={value}
                onChange={onChange}
                type="search"
                variant="standard"
            />
            {
                value?.length > 5 && (
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={onClick}>
                        <SearchIcon />
                    </IconButton>
                )
            }
        </Stack>
    )
}

export default UISearch