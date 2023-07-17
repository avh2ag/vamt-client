import React, { useContext } from 'react';
import { CasesContext } from '@/contexts/cases/CasesContext';
import { Case } from '@/types/cases';
import { Accordion, Card, Badge } from 'react-bootstrap';
import Link from 'next/link';

const CaseList: React.FC = () => {
  const { cases } = useContext(CasesContext);
  return (
    <>
      {cases.map((caseData: Case) => (
        <Accordion defaultActiveKey="0" key={caseData.id}>
          <Card>
            <Accordion.Header
              as={Card.Header}
              eventKey="0"
              className="bg-white"
            >
              <>
                <Badge
                  pill
                  bg={
                    caseData.type.toLowerCase() === 'civil'
                      ? 'primary'
                      : 'danger'
                  }
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
