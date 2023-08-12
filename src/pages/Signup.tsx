import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import kingstagramLogo from '../assets/Kingstagram.png';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';

interface form {
  email: null | string;
  password: null | string;
  name: null | string;
  nickname: null | string;
}

interface isValidForm {
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidName: boolean;
  isValidNickname: boolean;
}

const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);
    return result;
  };
};

// const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
//   let timeout: ReturnType<typeof setTimeout> | null = null;
//   return (...args: Parameters<T>): Promise<ReturnType<T>> => {
//     return new Promise((resolve) => {
//       if (timeout) clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         resolve(fn(...args));
//       }, delay);
//     });
//   };
// };

const Signup = () => {
  
  const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;
  const nameRegEx = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,5}$/;
  const nicknameRegEx = /^([_]?[a-z0-9]){4,16}$/;
  
  const [form, setForm] = useState<form>({
    email: null,
    password: null,
    name: null,
    nickname: null
  });

  const [isValid, setIsValid] = useState<isValidForm>({
    isValidEmail: false,
    isValidPassword: false,
    isValidName: false,
    isValidNickname: false
  })
  
  // const buttonRef = useRef<HTMLButtonElement | null> (null) 
  // const emailRef = useRef<HTMLInputElement>(null);
  // const passwordRef = useRef<HTMLInputElement>(null);
  // const nameRef = useRef<HTMLInputElement>(null);
  // const nicknamelRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if(buttonRef.current && emailRef.current && passwordRef.current && nameRef.current && passwordRef.current) {
  //     if(emailRef.current.children[1].color) {
  //       tmpRef.current.disabled = true;
  //     } else {
  //       tmpRef.current.disabled = false;
  //     }
  //   }
  // }, [isValid.isValidEmail, isValid.isValidPassword, isValid.isValidName, isValid.isValidNickname]);

  const isValidEmail = debounce((e) => {
      
      const currentEmail = e.target.value;
    
      setForm({...form, email: currentEmail});

      console.log(currentEmail);
      
      if (!emailRegEx.test(currentEmail)) {
        setIsValid({...isValid, isValidEmail: false});
        console.log("이메일 형식에 맞게 작성해주세요");
        alert("이메일 형식에 맞게 작성해주세요");
      } else {
        setIsValid({...isValid, isValidEmail: true});
      }
      console.log(isValid.isValidEmail)
  }, 1000);


    
  const isValidPassword = debounce((e) => {

    const currentPassword = e.target.value;
    
    setForm({...form, email: currentPassword});

    console.log(currentPassword);

    if (!passwordRegEx.test(currentPassword)) {
      alert("비밀번호 형식(소문자 or 대문자,숫자,!@#$%^&* 포함 8자에서 16자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidPassword: true});
    }
    console.log(isValid.isValidPassword);
  }, 1000)

  const isValidName = debounce((e) => {
    
    const currentName = e.target.value;
    
    setForm({...form, email: currentName});

    console.log(currentName);

    if (!nameRegEx.test(currentName)) {
      alert("이름 형식(한글로 이루어진 2자~5자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidName: true});
    }
    console.log(isValid.isValidName);
  }, 1000)

  const isValidNickname = debounce((e) => {

    const currentNickname = e.target.value;
    
    setForm({...form, email: currentNickname});

    console.log(currentNickname);

    if (!nicknameRegEx.test(currentNickname)) {
      alert("사용자 이름 형식(소문자,숫자,_(생략가능) 포함 4자~16자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidNickname: true});
    }
    console.log(isValid.isValidNickname);
  }, 1000)
  
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
            fullWidth
            id = 'email'
            label = '이메일'
            name = 'email'
            autoComplete = 'email'
            sx = {{ mt: "30px" }}
            // value = {form.email}
            onChange={isValidEmail}
            color = {isValid.isValidEmail ? 'success' : 'error'}
            // ref={emailRef}
            />
            <TextField
            fullWidth
            id = 'name'
            label = '성명'
            name = 'name'
            sx = {{ mt: "10px" }}
            // value = {form.name}
            onChange={isValidName}
            // ref={nameRef}
            color = {isValid.isValidName ? 'success' : 'error'}
            />
            <TextField
            fullWidth
            id = 'nickname'
            label = '사용자 이름'
            name = 'nickname'
            sx = {{ mt: "10px" }}
            // value = {form.nickname}
            onChange={isValidNickname}
            color = {isValid.isValidNickname ? 'success' : 'error'}
            // ref={nicknamelRef}
            />
            <TextField
            fullWidth
            id = 'password'
            label = '비밀번호'
            name = 'password'
            autoComplete = 'current-password'
            type = 'password'
            sx = {{ mt: "10px", mb: "50px" }}
            // value = {form.password}
            onChange={isValidPassword}
            color = {isValid.isValidPassword ? 'success' : 'error'}
            // ref={passwordRef}
            />
            <Button
              type = 'submit'
              fullWidth
              variant='contained'
              sx={{ fontSize: '16px', bgcolor: '#68b5fa', borderRadius: '10px'  }}
              // disabled 
              // ref = {buttonRef}
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
            fontSize = '16px'
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
          <Box 
            component = 'footer'
            sx={{ mt: '100px' }} 
          >
           <Typography>
           <img 
              src={kingstagramLogo} 
              alt="Kingstagram_logo"
              height = '20px'
              width= '100px'
            />
            </Typography> 
          </Box>
    </Container>
  );
}

export default Signup;
