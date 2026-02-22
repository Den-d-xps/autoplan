import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { open } from "@tauri-apps/plugin-shell";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const TECHNOLOGIES = [
  { label: "Tauri 2", icon: `${DEVICON}/tauri/tauri-original.svg` },
  { label: "React 19", icon: `${DEVICON}/react/react-original.svg` },
  { label: "TypeScript", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { label: "Material-UI 7", icon: `${DEVICON}/materialui/materialui-original.svg` },
  { label: "Playwright", icon: `${DEVICON}/playwright/playwright-original.svg` },
  { label: "Rust", icon: `${DEVICON}/rust/rust-original.svg` },
];

export const InfoPage = () => {
  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Box
          component="img"
          src="/app-icon.png"
          alt="Autoplan"
          sx={{ width: 64, height: 64 }}
        />
        <Box>
          <Typography variant="h5" fontWeight={700}>
            AUTOPLAN
          </Typography>
          <Typography variant="body2" color="text.secondary">
            v0.9.0
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="body1" sx={{ mb: 2 }}>
        Десктопное приложение для автоматизации работы с системой управления
        кинотеатрами Kinoplan.
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Разработчик
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Typography variant="body1">Denis Kostyuhin</Typography>
        <GitHubIcon
          fontSize="small"
          sx={{ color: "text.primary", cursor: "pointer" }}
          onClick={() => open("https://github.com/Den-d-xps")}
        />
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
        Технологии
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={3}>
        {TECHNOLOGIES.map((tech) => (
          <Stack key={tech.label} alignItems="center" spacing={0.5}>
            <Box
              component="img"
              src={tech.icon}
              alt={tech.label}
              sx={{ width: 36, height: 36 }}
            />
            <Typography variant="caption" color="text.secondary" noWrap>
              {tech.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
