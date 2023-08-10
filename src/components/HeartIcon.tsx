import React from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { IconButton } from '@mui/material';

type HeartIconProps = {
    isLiked: boolean;
    onToggleLike: () => void;
};

const HeartIcon: React.FC<HeartIconProps> = ({ isLiked, onToggleLike }) => {
    return (
        <IconButton
            size={'large'}
            disableRipple
            onClick={onToggleLike}
        >
            {isLiked
                ? <FavoriteRoundedIcon sx={{color: '#ff2f40'}}/>
                : <FavoriteBorderRoundedIcon sx={{'&:hover': {color: '#737373'}}}/>
            }
        </IconButton>
    );
};

export default HeartIcon;
