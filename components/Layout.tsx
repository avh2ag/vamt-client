import React, { ReactNode } from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import { Container, Navbar, Nav } from 'react-bootstrap';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'VAMT Datalab' }: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Navbar className="px-3 py-3" bg="light" expand="lg" sticky="top">
      <Navbar.Brand href="/">VAMT Datalab</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>{' '}
    </Navbar>
    <Container>{children}</Container>
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <span className="text-muted">Footer</span>
      </Container>
    </footer>
  </>
);

export default Layout;
