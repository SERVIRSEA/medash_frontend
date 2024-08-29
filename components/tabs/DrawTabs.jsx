import * as React from 'react';
import { useAtom } from 'jotai';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Draw from '@mui/icons-material/Draw';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SquareIcon from '@mui/icons-material/Square';
import HexagonIcon from '@mui/icons-material/Hexagon';
import Grid from '@mui/material/Grid';
import StreetviewIcon from '@mui/icons-material/Streetview';
import { Rectangle } from 'react-leaflet';
import { drawModalAtom } from '@/state/atoms';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function DrawTabs() {
    const [openModal, setOpenModal] = useAtom(drawModalAtom);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab icon={<Draw />} label="DRAW A SHAPES ON THE MAP" {...a11yProps(0)} />
                <Tab icon={<UploadFileIcon />} label="UPLOAD FILE(GEOJSON/KML)" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={3} style={{ cursor: 'pointer' }} onClick={() => { setOpenModal(false); activateDraw(); }}>
                            <div style={{ textAlign: 'center' }}>
                                <HexagonIcon />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="caption" component="div">
                                    Polygon
                                </Typography>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{ textAlign: 'center' }}>
                                <SquareIcon />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="caption" component="div">
                                    Rectangle
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
        </Box>
    );
}