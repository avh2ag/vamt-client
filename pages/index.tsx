import Link from 'next/link';
import Layout from '@/components/Layout';
import { withAuth } from '@/hocs/withAuth';
import { GetServerSideProps } from 'next';

const IndexPage = () => (
  <Layout title="Home">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">About</Link>
    </p>
  </Layout>
);

export const getServerSideProps: GetServerSideProps = withAuth();

export default IndexPage;
