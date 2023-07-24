import React, { useContext } from 'react';
import { CasesContext } from '@/contexts/cases/CasesContext';
import { Case } from '@/types/cases';
import { Accordion, Card, Badge, Spinner } from 'react-bootstrap';
import Link from 'next/link';

const CaseList: React.FC = () => {
  const { data: cases, loading } = useContext(CasesContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <>
      {cases?.map((caseData: Case) => (
        <Accordion defaultActiveKey="0" key={caseData.id}>
          <Card>
            <Accordion.Header
              as={Card.Header}
              eventkey="0"
              className="bg-white"
            >
              <>
                <Badge
                  pill
                  bg={caseData.type.toLowerCase() === 'civil' ? 'info' : 'dark'}
                  className="ms-2 me-4 text-uppercase"
                >
                  {caseData.type}
                </Badge>
                <Link href={`/cases/${caseData.id}`}>
                  {caseData.name} ({caseData.year})
                </Link>
              </>
            </Accordion.Header>
            <Accordion.Body>
              <Card.Body>
                More content to come in this eventually with more data
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </>
  );
};

export default CaseList;
