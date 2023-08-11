import React from 'react';
import NavigationBar from "../components/NavigationBar.tsx";
import Container from "@mui/system/Container";
import {Typography} from "@mui/material";

const NotFound: React.FC = () => {
    return (
        <Container>
            <NavigationBar />
            <Typography variant="subtitle1">저런! 그런 페이지는 없어요!</Typography>
        </Container>
    );
};

export default NotFound;
