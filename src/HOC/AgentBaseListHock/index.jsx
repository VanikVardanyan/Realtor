import React from 'react';
import AgentBaseBlacklist from '../../components/AgentBaseBlacklist';

const AgentBaseListHock = (Comp) => {
  const hoc = (props) => (
    <>
      <AgentBaseBlacklist {...props} />
      <Comp />
    </>
  );
  return hoc;
};

export default AgentBaseListHock;
