import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import logo from '../assets/Kingstagram.svg';
import logoK from '../assets/K.svg';


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

const drawerWidth = 240;

// 네비게이션 바가 열릴 때 적용되는 스타일을 정의
const openedMixin = (theme: Theme): CSSObject => ({             // (타입): 리턴값
    width: drawerWidth, // 240
    transition: theme.transitions.create('width', { // width 에 transition 을 적용할 건데,
        easing: theme.transitions.easing.sharp,                  // 빠른 속도로 시작해서 느리게 끝나는 전환 효과(sharp)
        duration: theme.transitions.duration.enteringScreen,     // 너비(width)가 얼마나 빠르게 늘어나야 하는지?(enteringScreen)
    }), // 숫자 대신(n 밀리초 등) 사용하는 이 값(enteringScreen 등)들은 일관된 사용자 경험을 위해 필요!
    overflowX: 'hidden', // 사이드바 영역을 벗어나는 경우 방지, ex)로고가 K 에서 Kingstagram 으로 바뀌는 순간
});

// 네비게이션 바가 닫힐 때 적용되는 스타일을 정의
const closedMixin = (theme: Theme): CSSObject => ({              // (타입): 리턴값
    transition: theme.transitions.create('width', { // width 에 transition 을 적용할 건데,
        easing: theme.transitions.easing.sharp,                  // 빠른 속도로 시작해서 느리게 끝나는 전환 효과(sharp)
        duration: theme.transitions.duration.leavingScreen,      // 너비(width)가 얼마나 빠르게 줄어들어야 하는지?(leavingScreen)
    }),  // 숫자 대신(n 밀리초 등) 사용하는 이 값(enteringScreen 등)들은 일관된 사용자 경험을 위해 필요!
    overflowX: 'hidden',   // 사이드바 영역을 벗어나는 경우 방지, ex)로고가 Kingstagram 에서 K 로 바뀌는 순간
    width: `calc(${theme.spacing(7)} + 1px)`, // theme.spacing(1)은 8px, 56+1=57px !
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up('sm'));
    const [open, setOpen] = React.useState(isMatch);
    const drawerIcons = [<HomeOutlinedIcon/>, <SearchRoundedIcon/>, <AddCircleOutlineRoundedIcon/>, <PermIdentityRoundedIcon/>];


    // Update the state when isMatch changes
    React.useEffect(() => {
        setOpen(isMatch);
    }, [isMatch]);

    return (
        <ThemeProvider theme={achromaticTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="fixed" open={open}>

                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <List>
                        <Box
                            component="img"
                            src={open ? logo : logoK}
                            alt="logo"
                            sx={{ height: '2em', mt: '1em', mb: '1em' }}
                        />
                        {['홈', '검색', '만들기', '프로필'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {drawerIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <DrawerHeader/>

                </Box>
            </Box>
        </ThemeProvider>
    );
}
