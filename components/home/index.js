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

export default function Home() {
    const { text, setText } = React.useContext(LoginContext);
    const [loginData, setLoginData] = React.useState({ title : '', password: ''})

    function handleChange(e) {
        const value = e.target.value;
        setLoginData({
          ...loginData,
          [e.target.name]: value
        });
      }
    const publish = async () => {
      let body = { title: loginData.title, content: loginData.content, type: loginData.type,
        accessToken : text.user.accessToken 
      }
      console.log({body})
      axios.post('/api/blog', body).then(res=>{}).catch(err=>{console.log(err)})
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
            <Button onClick={()=>{
                setText({ ...text , route: '/login'})
            }}>
                Login
            </Button>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}