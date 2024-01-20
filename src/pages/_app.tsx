import Layout from '@src/components/common/Layout'
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import '@src/styles/globals.css'
import { theme } from '../styles/theme';
import type { AppProps } from 'next/app'
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { store } from '@src/redux/store';

export default function App({ Component, pageProps }: AppProps) {

  const { asPath, pathname } = useRouter();
  const isLoginPage =
    asPath?.split('/').includes('login') || asPath?.split('/').includes('register')

  return (
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications
          autoClose={4000}
          maw="22rem"
          position="top-right"
        />
        {isLoginPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </MantineProvider>
    </Provider>
  )
}
