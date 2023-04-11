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
import TextareaAutosize from '@mui/base/TextareaAutosize';
import TextField from '@mui/material/TextField';

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

export default function Blogs() {
    const { text, setText } = React.useContext(LoginContext);
    const [loginData, setLoginData] = React.useState({ title : '', password: ''})

    function handleChange(e) {
        console.log({loginData})
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
        <Button onClick={()=>{
            setText({ ...text , route: '/'})
        }}>
          HOME
        </Button>
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
              <b>Create a new blog:</b>
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <TextareaAutosize
              name="content"
              type="text"
              placeholder="Content"
              onChange={handleChange}
              style={{
                borderRadius: '5px',
                border: '1px solid #d8d8df'
              }}
              minRows={10}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input
              name="type"
              type="text"
              placeholder="Type"
              onChange={handleChange}
            />
          </FormControl>

          <Button sx={{ mt: 1 /* margin top */ }} onClick={publish}>Publish</Button>
        </Sheet>
        {/* <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
        /> */}
      </main>
    </CssVarsProvider>
  );
}