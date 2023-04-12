import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { LoginContext } from '../contexts/loginProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function Login() {
    const { text, setText } = React.useContext(LoginContext);
    const [loginData, setLoginData] = React.useState({ email : '', password: ''})

    function handleChange(e) {
        const value = e.target.value;
        setLoginData({
          ...loginData,
          [e.target.name]: value
        });
      }
    const login = async () => {
        axios.post('/api/user/login', { email: loginData.email, password: loginData.password })
        .then(res => { 

          setTimeout(()=>{
            setText({ user: res.data , route: '/user'})
            localStorage.setItem( 'accessToken' , JSON.stringify(res.data) );
          },2000)

          toast.success('Login Successfull', { autoClose: 2000 })
        })
        .catch(err => { 
          console.log(err);
          toast.error('Please check email/password', { autoClose: 2000 })
        })
    }
  return (
    <CssVarsProvider>
      <main className='main-container'>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', 
            my: 4, 
            py: 3, 
            px: 2, 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome back!</b>
            </Typography>
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={login}>Log in</Button>
          <Typography
            endDecorator={<Link onClick={()=>{
                setText({user : null, route: '/register'})
              }}>Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
      <ToastContainer />
    </CssVarsProvider>
  );
}