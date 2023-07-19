import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { clearLoggedIn } from '../../store/authReducer';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  flexGrow: 1,
  marginRight: theme.spacing(10),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function HeaderBar() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  console.log("isLoggedIn", isLoggedIn)

  const handleSignUpOrLoginClick = () => {
    navigate('/sign-up-or-login');
  };

  const handleSignOutClick  = () => {
    dispatch(clearLoggedIn());
    sessionStorage.clear();
    navigate('/');
  };
  return (
    <AppBar position="fixed" color="default">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
        >
          <DashboardIcon color="primary" />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' }, color: '#17CFBB' }}
        >
          deliveroo
        </Typography>
        <Search className="search-bar">
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined">
            <ShoppingBasketIcon /> $ 0.00
          </Button>
          <Button variant="outlined" onClick={!isLoggedIn ? handleSignUpOrLoginClick : handleSignOutClick}>
            {!isLoggedIn? <><HomeIcon /> Sign up or login</>: <>Sign Out</>}
          </Button>
          <Button variant="outlined">
            <MenuIcon />
            Menu
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
