import React from 'react';
import { Stack, Box, IconButton, SvgIcon } from '@mui/material';
import { Facebook, LinkedIn, WhatsApp } from '@mui/icons-material';

const XIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M17.75 3.5H15.5L12 8.25 8.5 3.5H6.25L11 10 6 16.5H8.5L12 11.5 15.5 16.5H17.75L12.75 10 17.75 3.5Z" />
  </SvgIcon>
);

const ShareList = () => {
  const url = encodeURIComponent("https://cambodia-me-servir.adpc.net/mapviewer");
  const title = encodeURIComponent("Cambodia Biophysical Monitoring and Evaluation Dashboard!");

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank'); // X still uses Twitter's share URL for now
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      <Box>
        <IconButton
          onClick={shareOnFacebook}
          sx={{
            color: 'gray',
            '&:hover': {
              color: '#3b5998', // Facebook blue on hover
            },
          }}
        >
          <Facebook fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={shareOnX}
          sx={{
            color: 'gray',
            '&:hover': {
              color: 'black', // X black on hover
            },
          }}
        >
          <XIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={shareOnLinkedIn}
          sx={{
            color: 'gray',
            '&:hover': {
              color: '#0077b5', // LinkedIn blue on hover
            },
          }}
        >
          <LinkedIn fontSize="large" />
        </IconButton>
      </Box>
      <Box>
        <IconButton
          onClick={shareOnWhatsApp}
          sx={{
            color: 'gray',
            '&:hover': {
              color: '#25D366', // WhatsApp green on hover
            },
          }}
        >
          <WhatsApp fontSize="large" />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default ShareList;
