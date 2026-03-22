import { Group, Button, Menu, ActionIcon, Tooltip } from '@mantine/core';
import {
  IconBrandWindows,
  IconBrandApple,
  IconBrandAndroid,
  IconBrandUbuntu,
  IconDeviceTv,
  IconDownload,
  IconChevronDown,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { config } from '../config';

interface AppPlatform {
  key: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  detect: () => boolean;
}

function getIconColor(key: string) {
  const colors: Record<string, string> = {
    windows: '#0078d4',
    macos: '#555',
    ios: '#555',
    android: '#3ddc84',
    linux: '#f7941d',
    androidtv: '#3ddc84',
  };
  return colors[key] || 'gray';
}

function detectPlatform(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
  if (/Android/i.test(ua) && /Mobile/i.test(ua)) return 'android';
  if (/Android/i.test(ua)) return 'androidtv';
  if (/Windows NT/i.test(ua)) return 'windows';
  if (/Linux/i.test(ua)) return 'linux';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'macos';
  return '';
}

export default function AppDownloadBlock() {
  const { t } = useTranslation();
  const downloadLabel = t('services.download');

  const allPlatforms: AppPlatform[] = [
    {
      key: 'windows',
      name: config.WINDOWS_APP_NAME || downloadLabel,
      url: config.APP_WINDOWS_URL,
      icon: <IconBrandWindows size={20} color={getIconColor('windows')} />,
      detect: () => false,
    },
    {
      key: 'linux',
      name: config.LINUX_APP_NAME || downloadLabel,
      url: config.APP_LINUX_URL,
      icon: <IconBrandUbuntu size={20} color={getIconColor('linux')} />,
      detect: () => false,
    },
    {
      key: 'macos',
      name: config.MAC_APP_NAME || downloadLabel,
      url: config.APP_MAC_URL,
      icon: <IconBrandApple size={20} color={getIconColor('macos')} />,
      detect: () => false,
    },
    {
      key: 'ios',
      name: config.IOS_APP_NAME || downloadLabel,
      url: config.APP_IOS_URL,
      icon: <IconBrandApple size={20} color={getIconColor('ios')} />,
      detect: () => false,
    },
    {
      key: 'android',
      name: config.ANDROID_APP_NAME || downloadLabel,
      url: config.APP_ANDROID_URL,
      icon: <IconBrandAndroid size={20} color={getIconColor('android')} />,
      detect: () => false,
    },
    {
      key: 'apple_tv',
      name: config.APPLE_TV_APP_NAME || downloadLabel,
      url: config.APP_APPLE_TV_URL,
      icon: <IconDeviceTv size={20} color={getIconColor('macos')} />,
      detect: () => false,
    },
    {
      key: 'androidtv',
      name: config.ANDROID_TV_APP_NAME || downloadLabel,
      url: config.APP_ANDROID_TV_URL,
      icon: <IconDeviceTv size={20} color={getIconColor('androidtv')} />,
      detect: () => false,
    },
  ].filter((p) => !!p.url);

  if (allPlatforms.length === 0) return null;

  const detectedKey = detectPlatform();
  const primary = allPlatforms.find((p) => p.key === detectedKey) || allPlatforms[0];
  const others = allPlatforms.filter((p) => p.key !== primary.key);

  return (
      <Group gap="xs">
        <Button
          component="a"
          href={primary.url}
          target="_blank"
          rel="noopener noreferrer"
          leftSection={primary.icon}
          rightSection={<IconDownload size={16} />}
          variant="light"
        >
          {primary.name}
        </Button>

        {others.length > 0 && (
          <Menu shadow="md" width={220} position="bottom-end">
            <Menu.Target>
              <Tooltip label={t('apps.otherPlatforms')}>
                <ActionIcon variant="light" size="lg">
                  <IconChevronDown size={16} />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{t('apps.otherPlatforms')}</Menu.Label>
              {others.map((p) => (
                <Menu.Item
                  key={p.key}
                  leftSection={p.icon}
                  component="a"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.name}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
  );
}
