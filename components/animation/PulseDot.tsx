import { motion } from "framer-motion";
import Box from "@mui/material/Box";

const MotionBox = motion(Box);

const sizes = {
  sm: { wrapper: 10, core: 7  },
  md: { wrapper: 12, core: 9  },
  lg: { wrapper: 16, core: 11 },
} as const;

interface PulseDotProps {
  color    : string;
  size    ?: keyof typeof sizes;
  duration?: number;
}

export function PulseDot({
  color,
  size     = "md",
  duration = 3,
}: PulseDotProps) {
  const { wrapper, core } = sizes[size];

  return (
    <Box sx={{ position: "relative", width: wrapper, height: wrapper, display: "flex", alignItems: "center", justifyContent: "center" }}>

      <MotionBox
        sx={{ position: "absolute", width: wrapper, height: wrapper, borderRadius: "50%", bgcolor: color }}
        animate={{ scale: [1, 2.6], opacity: [0.5, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeOut", repeatDelay: 0.6 }}
      />

      <MotionBox
        sx={{ width: core, height: core, borderRadius: "50%", bgcolor: color, position: "relative", zIndex: 1 }}
        animate={{ opacity: [0.75, 1, 0.75] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />

    </Box>
  );
}
