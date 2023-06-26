import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import Logo from '../../assets/image/logo.png';
import { Box, Toolbar, InputBase, Badge } from '@mui/material'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function SecondNav() {
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cartItems);
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${search}`);
    setSearch("");
  }
  return (
      <>
        <Toolbar sx={{justifyContent: "space-between", p: 0}}>
          <Box sx={{display: {xs: "none", sm: "block"}}}>
            <Link to="/">
              <img src={Logo} alt='' style={{height: "40px"}}/>
            </Link>
          </Box>
          <form  onSubmit={handleSubmit}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>       
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>
          </form>
          <Link to="/cartProducts" className='inherit'>
            <Box>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={items.length} color="error">
                  <LocalGroceryStoreOutlinedIcon />
                </Badge>
              </IconButton>         
            </Box>
          </Link>
        </Toolbar>
      </>
  );
}
