import { GetServerSideProps } from 'next';
import { withAuth } from '@/hocs/withAuth';
import { CasesProvider } from '@/contexts/cases/CasesContext';
import CaseList from '@/components/cases/CaseList/CaseList';
import Layout from '@/components/Layout';

const CasesPage = () => {
  return (
    <CasesProvider>
      <Layout title="Cases">
        <div>
          <CaseList />
        </div>
      </Layout>
    </CasesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth();

export default CasesPage;
