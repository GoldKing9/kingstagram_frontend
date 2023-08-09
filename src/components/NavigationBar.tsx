import * as React from 'react';
import {styled, useTheme, Theme, CSSObject} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
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
import logo from '../assets/Kingstagram.png';
import logoK from '../assets/K.png';

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
    width: `calc(${theme.spacing(7)} + 1px)`, // 단위 theme.spacing(1)은 8px, 56+1=57px !
}); // 57px 이라고 안 쓰고 굳이 단위를 붙여 계산하는 이유는? 개발자가 직접 계산한 값을 추가하는 것보다 직관적이기 때문!
    // 1px 을 더한 이유는? 브라우저는 CSS 계산을 할 때 소수점을 반올림, 정밀한 레이아웃 조절이 필요할 경우 1px을 추가 (큰 차이는 없음)

const Drawer = styled(MuiDrawer)(({theme, open}) => ({ // MuiDrawer 라는 기존 컴포넌트에 스타일링을 추가 -> 새로운 Drawer 컴포넌트
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? {                                  // `...` : spread 문법, openedMixin(closedMixin) 에서 반환한 객체값을 풀어놓는다.
        '& .MuiDrawer-paper': openedMixin(theme), // .MuiDrawer-paper 를 오버라이드하여 스타일 변경
    } : {
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
    // open 이 true 일 경우, openedMixin 의 리턴값을 spread 하면 다음과 같다.
    // '& .MuiDrawer-paper': {
    //         width: drawerWidth,
    //         transition: theme.transitions.create('width', {
    //             easing: theme.transitions.easing.sharp,
    //             duration: theme.transitions.duration.enteringScreen,
    //         }),
    //         overflowX: 'hidden',
    //     }
}));

export default function NavigationBar() {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.up('md'));
    const [open, setOpen] = React.useState(isMatch); // 상태의 변화에 따라 UI를 업데이트, 렌더링 필요
    const drawerIcons = [<HomeOutlinedIcon/>, <SearchRoundedIcon/>, <AddCircleOutlineRoundedIcon/>,
        <PermIdentityRoundedIcon/>];

    React.useEffect(() => {
        setOpen(isMatch);
    }, [isMatch]);

    return (
        <ThemeProvider theme={achromaticTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/> {/* 브라우저 간 일관된 스타일링을 보장, MUI에서 제공 */}
                <Drawer variant="permanent" open={open}>
                    <List>
                        <Box
                            component="img"
                            src={open ? logo : logoK}
                            alt="logo"
                            sx={{height: '2em', mt: '1em', mb: '1em'}}
                        />
                        {['홈', '검색', '만들기', '프로필'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{display: 'block'}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {drawerIcons[index]}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}
