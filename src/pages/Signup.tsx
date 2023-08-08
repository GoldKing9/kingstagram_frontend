// import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import kingstagramLogo from '../assets/Kingstagram.svg';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';

const Signup = () => {
  return (
    <Container fixed>
          <Box
            sx = {{ border: '1px solid rgb(219, 219, 219)', 
            padding: '20px', 
            height: '500px',
            mb: '20px',
            borderRadius: '5px',
            }}
            component = "div"
            width = '350px' 
          >
            <Typography
             sx={{ mt: '20px'}}
             color = 'gray'
             textAlign = 'center'
            >
              <img 
                src = {kingstagramLogo} 
                alt = "Kingstagram"
                width = "250px" 
              />
              <Box 
                component = 'div'
                sx={{ mt: '5px' }}
              >
                친구들의 사진과 동영상을 보려면 가입하세요.
              </Box>
            </Typography> 
            <TextField
            required
            fullWidth
            id = 'email'
            label = '이메일'
            name = 'email'
            autoComplete = 'email'
            autoFocus
            sx = {{ mt: "30px" }}
            />
            <TextField
            required
            fullWidth
            id = 'name'
            label = '성명'
            name = 'name'
            autoFocus
            sx = {{ mt: "10px" }}
            />
            <TextField
            required
            fullWidth
            id = 'nickname'
            label = '사용자 이름'
            name = 'nickname'
            autoFocus
            sx = {{ mt: "10px" }}
            />
            <TextField
            required
            fullWidth
            id = 'password'
            label = '비밀번호'
            name = 'password'
            autoComplete = 'current-password'
            type = 'password'
            sx = {{ mt: "10px", mb: "50px" }}
            />
            <Button
              type = 'submit'
              fullWidth
              variant='contained'
              sx={{ fontSize: '16px' }}
            >
              가입
            </Button>  
          </Box>
          <Box
            component = "div"
            sx = {{ border: '1px solid rgb(219, 219, 219)',
            borderRadius: '5px'
            }}
            height = '70px'
            fontSize = '20px'
            textAlign = 'center'
            lineHeight='70px'
          >
            계정이 있으신가요?  
            <Link 
              href ='/'
              style={{ textDecoration: 'none' }}
            >
              &nbsp;&nbsp;로그인
            </Link>
          </Box>
          <Box component = 'footer'>
           <Typography>
           <img 
              src={kingstagramLogo} 
              alt="Kingstagram_logo"
              height = '100px'
              width= '100px' 
            />
            </Typography> 
          </Box>
    </Container>
  );
}

export default Signup;
