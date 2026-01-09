'use client';

import Link from 'next/link';
import { Box, Typography, Link as MuiLink } from '@mui/material';

export default function LogoLink() {
  return (
    <MuiLink 
      component={Link} 
      href="/" 
      underline="none" 
      color="inherit"
      sx={{ display: 'inline-block' }}
    >
      <Typography variant="h4" fontWeight={600}>
        C
        <Box component="span" color="primary.main">
          l
        </Box>
        ient App
      </Typography>
    </MuiLink>
  );
}