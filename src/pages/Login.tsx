// import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import kingstagramLogo from '../assets/Kingstagram.png';
import Box from '@mui/material/Box';
import kingstagramPhoto from '../assets/King.png';
import Link from '@mui/material/Link';
import  Grid  from '@mui/material/Grid';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';

const Login = () => {
  return (
    <Container fixed>
      <Grid 
        container 
        alignItems = 'center'
        sx={{ mt: '50px' }}
        width = '700px'
        margin = 'auto'
      >
        <Grid item xs={6} sm={6}>
          <Box>
            <img 
              src={kingstagramPhoto} 
              alt="Kingstagram_photo"
              height = '550px'
              width= '300px' 
            />
          </Box>
        </Grid>
        <Grid 
          item xs={6} sm={6}
          sx={{ width: '300px'}}
          textAlign = 'center'
        >
          <Box
            sx = {{ border: '1px solid rgb(219, 219, 219)', 
            padding: '20px', 
            height: '350px',
            mb: '20px',
            borderRadius: '5px',
            }}
            component = "div" 
          >
            <Typography sx={{ mt: '20px' }}>
              <img 
                src = {kingstagramLogo} 
                alt = "Kingstagram"
                width = "250px" 
              />
            </Typography> 
            <TextField
            required
            fullWidth
            id = 'email'
            label = '이메일'
            name = 'email'
            autoComplete = 'email'
            autoFocus
            sx = {{ mb: "10px", mt: "30px" }}
            />
            <TextField
            required
            fullWidth
            id = 'password'
            label = '비밀번호'
            name = 'password'
            autoComplete = 'current-password'
            type = 'password'
            sx = {{ mb: "70px" }}
            />
            <Button
              type = 'submit'
              fullWidth
              variant='contained'
              sx={{ fontSize: '16px' }}
            >
              로그인
            </Button>  
          </Box>
          <Box
            component = "div"
            sx = {{ border: '1px solid rgb(219, 219, 219)',
            borderRadius: '5px'
            }}
            height = '100px'
            fontSize = '20px'
            textAlign = 'center'
            lineHeight='100px'
          >
            계정이 없으신가요?  
            <Link 
              href ='#'
              style={{ textDecoration: 'none' }}
            >
              &nbsp;&nbsp;가입하기
            </Link>
          </Box>
        </Grid>
        <Grid 
          item xs={12} sm={12}
          textAlign = 'center'
          sx={{ mt: '100px' }}
        >
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
