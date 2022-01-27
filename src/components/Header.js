import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react'
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';


function Header(props) {
    const { title } = props;
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();


    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/logout');
            setUser(null);
            history.push('/');
        } catch (err) {
            alert("something went wrong");
        }
    };

    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ flex: 1 }} />
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    noWrap
                // sx={{ flexGrow: 1 }}
                >
                    {user && `Hey, ${user.firstName}!`}
                </Typography>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" size="small" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
            </Toolbar>
        </React.Fragment>
    );
}

export default Header;