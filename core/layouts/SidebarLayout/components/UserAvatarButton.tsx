import { styled, Box } from '@mui/material';
import type { BoxProps } from '@mui/material';
import { SIDEBAR_TRANSITION } from '../constants/sidebar';

interface UserAvatarButtonProps extends BoxProps {
  isNavbar?: boolean;
  isCollapsed?: boolean;
}

const UserAvatarButton = styled(Box, {
  shouldForwardProp: prop => prop !== 'isNavbar' && prop !== 'isCollapsed',
})<UserAvatarButtonProps>(({ theme, isNavbar = false, isCollapsed = false }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  cursor: 'pointer',

  width: isNavbar ? 34 : 'auto',
  height: isNavbar ? 34 : 'auto',

  paddingTop: isNavbar ? 0 : theme.spacing(1),
  paddingBottom: isNavbar ? 0 : theme.spacing(1),
  paddingLeft: isNavbar ? 0 : isCollapsed ? theme.spacing(0.75) : theme.spacing(1.25),
  paddingRight: isNavbar ? 0 : isCollapsed ? theme.spacing(0.75) : theme.spacing(1.25),

  gap: isNavbar || isCollapsed ? 0 : theme.spacing(1.5),

  borderRadius: isNavbar ? '50%' : theme.shape.borderRadius,
  border: '1px solid',
  borderColor: isNavbar ? 'transparent' : theme.palette.divider,


  backgroundColor: isNavbar ? 'transparent' : theme.palette.primary.main + '1A',

  transition: [
    `gap ${SIDEBAR_TRANSITION}`,
    `padding ${SIDEBAR_TRANSITION}`,
    'box-shadow 0.2s',
    'border-color 0.2s',
  ].join(', '),

  '&:hover': {
    boxShadow: isNavbar ? 'none' : theme.shadows[3],
    borderColor: isNavbar ? 'transparent' : theme.palette.primary.main,
    backgroundColor: isNavbar ? theme.palette.action.hover : undefined,
  },
}));

export default UserAvatarButton;
