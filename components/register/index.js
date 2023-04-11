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

export default function Register() {
    const { text, setText } = React.useContext(LoginContext);
    const [loginData, setLoginData] = React.useState({ email : '', password: '', cpassword: ''})

    function handleChange(e) {
        const value = e.target.value;
        setLoginData({
          ...loginData,
          [e.target.name]: value
        });
      }
    const register = async () => {
        let body = {name: loginData.name, email: loginData.email, password: loginData.password }
        console.log({body})
        axios.post('/api/user/register', body).then(res=>{}).catch(err=>{console.log(err)})
    }
  return (
    <CssVarsProvider>
      <main className='main-container'>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
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
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Sign up to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
          </FormControl>
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
          <FormControl>
            <FormLabel> Confirm Password</FormLabel>
            <Input
              name="cpassword"
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={register}>Sign up</Button>
          <Typography
            endDecorator={<Link onClick={()=>{
                setText({user : null, route: '/'})
              }}>Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}