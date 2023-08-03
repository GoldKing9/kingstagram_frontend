import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/Kingstagram.svg';
// import logoK from '../assets/K.svg'; // 축소된 로고
import {createTheme, ThemeProvider} from '@mui/material/styles';


const drawerWidth = 240;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}


const achromaticTheme = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
    },
    components: {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: '#000000',
                },
            },
        },
    },
});

export default function NavigationBar(props: Props) {
    const {window} = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawerIcons = [<HomeOutlinedIcon/>, <SearchRoundedIcon/>, <AddCircleOutlineRoundedIcon/>,
        <PermIdentityRoundedIcon/>];


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                <img src={logo} alt="logo" style={{height: '2em'}}/>
            </Toolbar>
            <List>
                {['홈', '검색', '만들기', '프로필'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {drawerIcons[index]}
                            </ListItemIcon>
                            <ListItemText primary={text} sx={{ display: { xs: 'none', sm: 'block' } }}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <ThemeProvider theme={achromaticTheme}> {
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    sx={{
                        width: {sm: `calc(100% - ${drawerWidth}px)`},
                        ml: {sm: `${drawerWidth}px`},
                    }}
                >
                </AppBar>
                <Box
                    component="nav"
                    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                    aria-label="navigation folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: {xs: 'block', sm: 'none'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: {xs: 'none', sm: 'block'},
                            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
                >
                    <Toolbar/>
                </Box>
            </Box>
        }
        </ThemeProvider>

    );
}
