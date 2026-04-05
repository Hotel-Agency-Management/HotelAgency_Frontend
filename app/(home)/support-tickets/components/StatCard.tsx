import { AccentColor } from "@/core/types/accentColors";
import { Card, CardContent, Stack, Typography, Skeleton, Avatar, Box } from "@mui/material";

export interface StatCardProps {
  title: string;
  value: string | number;
  helper?: string;
  icon: React.ReactNode;
  accentColor: AccentColor;
  loading?: boolean;
}
export function StatCard({ title, value, helper, icon, accentColor, loading }: StatCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <CardContent
        sx={{
          p: 2.5,
          flex: 1,
          display: 'flex',
          '&:last-child': { pb: 2.5 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
          sx={{ width: '100%', height: '100%' }}
        >
          <Stack
            spacing={0.5}
            minWidth={0}
            justifyContent="space-between"
            sx={{ height: '100%', flex: 1 }}
          >
            <Box>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
                letterSpacing={0.5}
                textTransform="uppercase"
              >
                {title}
              </Typography>

              {loading ? (
                <Skeleton width={60} height={36} />
              ) : (
                <Typography variant="h4" fontWeight={700}  color="text.primary">
                  {value}
                </Typography>
              )}
            </Box>

            {helper ? (
              <Typography variant="caption" color="text.secondary">
                {loading ? <Skeleton width={90} /> : helper}
              </Typography>
            ) : (
              <Box />
            )}
          </Stack>

          <Avatar variant="soft" color={accentColor} sx={{ flexShrink: 0 }}>
            {icon}
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
