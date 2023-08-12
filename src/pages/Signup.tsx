import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import kingstagramLogo from '../assets/Kingstagram.png';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const passwordRegEx = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*]).{8,16}$/;
  const nameRegEx = /^(?!(?:[ㄱ-ㅎㅏ-ㅣ]+|[aeiouAEIOU]+)$)[가-힣]{2,5}$/;
  const nicknameRegEx = /^(?=.*[a-z])(?=.*[!@#$%^&*_0-9])(?!.*[A-Z]).{4,16}$/;
  
  const [form, setForm] = useState<form>({
    email: "",
    password: "",
    name: "",
    nickname: ""
  });

  const [isValid, setIsValid] = useState<isValidForm>({
    isValidEmail: false,
    isValidPassword: false,
    isValidName: false,
    isValidNickname: false
  })

  const isValidEmail = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      
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
  }, 800);


    
  const isValidPassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentPassword = e.target.value;
    
    setForm({...form, password: currentPassword});

    console.log(currentPassword);

    if (!passwordRegEx.test(currentPassword)) {
      setIsValid({...isValid, isValidPassword: false});
      console.log("비밀번호 형식(소문자 or 대문자,숫자,!@#$%^&* 포함 8자에서 16자)에 맞게 작성해주세요");
      alert("비밀번호 형식(소문자 or 대문자,숫자,!@#$%^&* 포함 8자에서 16자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidPassword: true});
    }
    console.log(isValid.isValidPassword);
  }, 800)

  const isValidName = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    
    const currentName = e.target.value;
    
    setForm({...form, name: currentName});

    console.log(currentName);

    if (!nameRegEx.test(currentName)) {
      setIsValid({...isValid, isValidName: false});
      console.log("이름 형식(한글로 이루어진 2자~5자)에 맞게 작성해주세요")
      alert("이름 형식(한글로 이루어진 2자~5자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidName: true});
    }
    console.log(isValid.isValidName);
  }, 800)

  const isValidNickname = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentNickname = e.target.value;
    
    setForm({...form, nickname: currentNickname});

    console.log(currentNickname);

    if (!nicknameRegEx.test(currentNickname)) {
      setIsValid({...isValid, isValidNickname: false});
      console.log("사용자 이름 형식(소문자,숫자,_(생략가능) 포함 4자~16자)에 맞게 작성해주세요")
      alert("사용자 이름 형식(소문자,숫자,_(생략가능) 포함 4자~16자)에 맞게 작성해주세요");
    } else {
      setIsValid({...isValid, isValidNickname: true});
    }
    console.log(isValid.isValidNickname);
  }, 800)

  const onSubmit = async() => {
    await axios
      .post('http://localhost:8080/sosak.store/api/signup', {
        userEmail: form.email,
        userNickname: form.nickname,
        userPw: form.password,
        userName: form.name
      })
      .then(function (Responses) {
        console.log(Responses);
        alert("회원가입에 성공하셨습니다!");
        if(Responses.status === 200) {
          navigateLogin(); 
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/");
  };

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
          onChange={isValidEmail}
          color = {isValid.isValidEmail ? 'success' : 'error'}
        />
        <TextField
          fullWidth
          id = 'name'
          label = '성명'
          name = 'name'
          sx = {{ mt: "10px" }}
          onChange={isValidName}
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
          onChange={isValidPassword}
          color = {isValid.isValidPassword ? 'success' : 'error'}
        />
        <Button
          type = 'submit'
          fullWidth
          variant='contained'
          sx={{ fontSize: '16px', bgcolor: '#68b5fa', borderRadius: '10px'  }}
          disabled = {isValid.isValidEmail && isValid.isValidPassword && isValid.isValidName && isValid.isValidNickname ? false : true}
          onClick={onSubmit}
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

// 의문점  isValid의 state값이 TextField의 색에는 실시간으로 반영되는것 같은데
// isValid에 대한 상태값을 각각 console로 찍어보면 약간 늦게 반응하는것으로 추정됨.
