import React , { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import teamImg from '../assets/images/team.png'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailIcon from '@mui/icons-material/Mail';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


export default function Teams() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div >
            <Container>
                <Grid container>
                    <Grid xs={12} sm={6} md={3}>
                        <Box p={1} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                            <div sx={{position: 'relative'}}>
                            <Card sx={{ padding: '10px', marginTop: '50px', cursor:'pointer', bboxShadow: 3 }} >
                                <CardContent>
                                    <Avatar 
                                        src={teamImg} 
                                        alt="Team"
                                        sx={{width:"150px", height: "150px", margin: "auto"}}
                                    />
                                    <Typography variant="body1" textAlign={"center"} style={{fontWeight: 'bold', paddingTop: '15px', paddingBottom: '5px'}}>
                                        Name
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>
                                        Position
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={0} sx={{margin: 'auto'}}>
                                        <Link href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                            <IconButton aria-label="LinkedIn" color="primary">
                                                <LinkedInIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="Email" color="primary" onClick={handleClickOpen}>
                                            <MailIcon />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="Email"
                                            aria-describedby="Email address"
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    <List>
                                                        <ListItem>
                                                            <MailIcon />
                                                            <ListItemText primary="user@mail.com" style={{paddingLeft: "10px"}}/>
                                                        </ListItem>
                                                    </List>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </Stack>
                                </CardActions>
                            </Card>
                            </div>
                            
                            {/* {isHovering && (
                                <div sx={{position: 'relative'}}>
                                    <Card sx={{ marginBottom: '-100px'}} >
                                        <CardContent>
                                            <Typography variant="body2" textAlign={"center"}>
                                                Show more 
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                               
                            )} */}
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Box p={1}>
                            <Card sx={{ padding: '10px', marginTop: '50px', cursor:'pointer', bboxShadow: 3 }} >
                                <CardContent>
                                    <Avatar 
                                        src={teamImg} 
                                        alt="Team"
                                        sx={{width:"150px", height: "150px", margin: "auto"}}
                                    />
                                    <Typography variant="body1" textAlign={"center"} style={{fontWeight: 'bold', paddingTop: '15px', paddingBottom: '5px'}}>
                                        Name
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>
                                        Position
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={0} sx={{margin: 'auto'}}>
                                        <Link href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                            <IconButton aria-label="LinkedIn" color="primary">
                                                <LinkedInIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="Email" color="primary" onClick={handleClickOpen}>
                                            <MailIcon />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="Email"
                                            aria-describedby="Email address"
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    <List>
                                                        <ListItem>
                                                            <MailIcon />
                                                            <ListItemText primary="user@mail.com" style={{paddingLeft: "10px"}}/>
                                                        </ListItem>
                                                    </List>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Box p={1}>
                            <Card sx={{ padding: '10px', marginTop: '50px', cursor:'pointer', bboxShadow: 3 }} >
                                <CardContent>
                                    <Avatar 
                                        src={teamImg} 
                                        alt="Team"
                                        sx={{width:"150px", height: "150px", margin: "auto"}}
                                    />
                                    <Typography variant="body1" textAlign={"center"} style={{fontWeight: 'bold', paddingTop: '15px', paddingBottom: '5px'}}>
                                        Name
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>
                                        Position
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={0} sx={{margin: 'auto'}}>
                                        <Link href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                            <IconButton aria-label="LinkedIn" color="primary">
                                                <LinkedInIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="Email" color="primary" onClick={handleClickOpen}>
                                            <MailIcon />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="Email"
                                            aria-describedby="Email address"
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    <List>
                                                        <ListItem>
                                                            <MailIcon />
                                                            <ListItemText primary="user@mail.com" style={{paddingLeft: "10px"}}/>
                                                        </ListItem>
                                                    </List>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid xs={12} sm={6} md={3}>
                        <Box p={1}>
                            <Card sx={{ padding: '10px', marginTop: '50px', cursor:'pointer', bboxShadow: 3 }} >
                                <CardContent>
                                    <Avatar 
                                        src={teamImg} 
                                        alt="Team"
                                        sx={{width:"150px", height: "150px", margin: "auto"}}
                                    />
                                    <Typography variant="body1" textAlign={"center"} style={{fontWeight: 'bold', paddingTop: '15px', paddingBottom: '5px'}}>
                                        Name
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>
                                        Position
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Stack direction="row" spacing={0} sx={{margin: 'auto'}}>
                                        <Link href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                            <IconButton aria-label="LinkedIn" color="primary">
                                                <LinkedInIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="Email" color="primary" onClick={handleClickOpen}>
                                            <MailIcon />
                                        </IconButton>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="Email"
                                            aria-describedby="Email address"
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    <List>
                                                        <ListItem>
                                                            <MailIcon />
                                                            <ListItemText primary="user@mail.com" style={{paddingLeft: "10px"}}/>
                                                        </ListItem>
                                                    </List>
                                                </DialogContentText>
                                            </DialogContent>
                                        </Dialog>
                                    </Stack>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}