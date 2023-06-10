import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from './home.module.scss';
import SideBar from '../../components/SideBar/SideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Path, SideBarConfig } from 'renderer/constant';
import SourceManger from './SourceManger';
import Bookshelf from './Bookshelf';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: 'var(--color-accent-emphasis)',
    color: 'var(--white)',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    minHeight: 0,
    flexGrow: 1,
    display: 'none',
    color: 'var(--white)',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'var(--white)',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '28ch',
      },
    },
  },
}));

export function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Reader
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="left">
        <SideBar />
      </div>
      <div className={styles.right}>
        <Routes>
          <Route path={Path.Bookshelf} element={<Bookshelf />} />
          <Route path={Path.SourceManger} element={<SourceManger />} />
          <Route
            path={'/'}
            element={<Navigate to={SideBarConfig[0].path} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}
