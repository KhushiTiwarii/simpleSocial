import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import HomePage from './scenes/homePage';
import ProfilePage from './scenes/profilePage';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline,ThemeProvider } from '@mui/material';
import {createTheme} from "@mui/material/styles";
import { themeSettings } from './theme';

function App() {

  const mode = useSelector((state)=>state.mode);//state ke index.js se ayega
  const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  const isAuth = Boolean(useSelector((state)=>state.token)); //if token aya toh true(logged in hai)

  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/home' element={isAuth ? <HomePage/> : <Navigate to='/'/>}/>  {/* if logged in(token aya) then */}
          <Route path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
