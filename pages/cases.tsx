import { GetServerSideProps } from 'next';
import { withAuth } from '@/hocs/withAuth';
import { CasesProvider } from '@/contexts/cases/CasesContext';
import CaseList from '@/components/cases/CaseList/CaseList';
import CaseForm from '@/components/cases/CaseForm/CaseForm';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Button, Modal } from 'react-bootstrap';
import { Case } from '@/types/cases';

const CasesPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const createCase = (caseData: Case) => {
    console.log(caseData);
    setShowModal(false);
  };

  return (
    <CasesProvider>
      <Layout title="Cases">
        <div>
          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              onClick={handleShowModal}
              title="Add Case"
            >
              <FaPlus />
            </Button>
          </div>

          <CaseList />
        </div>
      </Layout>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CaseForm onSubmitSuccess={createCase} />
        </Modal.Body>
      </Modal>
    </CasesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = withAuth();

export default CasesPage;
