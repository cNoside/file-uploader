import { DefaultSeoProps } from 'next-seo';

export const SEOConfig: DefaultSeoProps = {
  titleTemplate: '%s | File Uploader',
  defaultTitle: 'File Uploader',
  description: 'A file uploading web app',
  canonical: 'https://file-uploader.deploy.cnoside.dev',
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico'
    }
  ],
  openGraph: {
    url: 'https://file-uploader.deploy.cnoside.dev',
    title: 'File Uploader',
    type: 'website',
    site_name: 'File Uploader',
    locale: 'en_SG',
    images: [
      {
        url: 'https://dev-cnoside.sgp1.digitaloceanspaces.com/shared/images/nextjs-mantine-template.og-image.jpg',
        alt: 'File Uploader og:image',
        width: 1280,
        height: 640
      }
    ]
  }
};
