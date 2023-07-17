import React, { useContext } from 'react';
import { CasesContext } from '../../contexts/cases/CasesContext';
import { Case } from '../../types/cases';
import Link from 'next/link';

const CaseList: React.FC = () => {
  const { cases } = useContext(CasesContext);
  return (
    <div>
      {cases.map((caseData: Case) => (
        <div key={caseData.id}>
          <Link href={`/cases/${caseData.id}`}>{caseData.name}</Link>
          <p>{caseData.year}</p>
          <p>{caseData.type}</p>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
