
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import Layout from "../components/layout/Layout"
import {client} from "../apollo-client"
import {ApolloProvider} from "@apollo/client"
import {AuthProvider} from "../shared/contexts/AuthContext"
import {AuthGuard} from "../shared/AuthGuard"

export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>blueMovie</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Layout>
              {Component.requireAuth ? 
                <AuthGuard>
                  <Component {...pageProps} />
                </AuthGuard>
                : 
                <Component {...pageProps} />
              }
            </Layout>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};