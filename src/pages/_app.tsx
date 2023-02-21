import '../global.css';
import type { AppProps } from 'next/app'
import { NoticeProvider, NoticeBanner } from '@/components/Notice';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NoticeProvider>
      <Component {...pageProps} />
      <NoticeBanner />
    </NoticeProvider>
  );
}
