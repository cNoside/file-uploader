// const FILE_TYPE_ICONS = {
//   'application/pdf': 'pdf'

import { ThemeIcon } from '@mantine/core';
import {
  IconFile,
  IconFileText,
  IconFileZip,
  IconFileMusic,
  IconFileCode,
  IconPhoto,
  IconVideo
} from '@tabler/icons';

type Props = {
  extension?: string;
  type?: string;
};

export const getFileIcon = (props: Props) => {
  const { extension, type } = props;

  if (extension) {
    // text files
    if (
      [
        'pdf',
        'txt',
        'doc',
        'docx',
        'rtf',
        'odt',
        'tex',
        'wks',
        'wps',
        'wpd'
      ].includes(extension)
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="gray" variant="light">
          <IconFileText size={25} />
        </ThemeIcon>
      );
    }
    // zip files
    if (
      ['zip', 'rar', '7z', 'gz', 'tar', 'z', 'z7', 'z8', 'z9'].includes(
        extension
      )
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="red" variant="light">
          <IconFileZip size={25} />
        </ThemeIcon>
      );
    }
    // audio files
    if (
      ['mp3', 'wav', 'wma', 'aac', 'aif', 'flac', 'm4a', 'ogg', 'wma'].includes(
        extension
      )
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="pink" variant="light">
          <IconFileMusic size={25} />
        </ThemeIcon>
      );
    }
    // video files
    if (
      ['mp4', 'avi', 'flv', 'mov', 'wmv', '3gp', 'mkv', 'webm'].includes(
        extension
      )
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="blue" variant="light">
          <IconVideo size={25} />
        </ThemeIcon>
      );
    }
    // code files
    if (
      [
        'html',
        'css',
        'js',
        'jsx',
        'ts',
        'tsx',
        'php',
        'py',
        'java',
        'c',
        'cpp',
        'cs',
        'go',
        'rb',
        'swift',
        'json',
        'xml'
      ].includes(extension)
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="green" variant="light">
          <IconFileCode size={25} />
        </ThemeIcon>
      );
    }

    // image files
    if (
      [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'bmp',
        'svg',
        'psd',
        'raw',
        'webp'
      ].includes(extension)
    ) {
      return (
        <ThemeIcon size="lg" radius="xl" color="grape" variant="light">
          <IconPhoto size={25} />
        </ThemeIcon>
      );
    }
  }

  // TODO: check mimeType'
  if (type) {
  }

  return (
    <ThemeIcon size="lg" radius="xl" color="orange" variant="light">
      <IconFile size={25} />
    </ThemeIcon>
  );
};
