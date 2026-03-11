import React from 'react';

const DashboardPage = ({ children }) => {
  return (
    <main className="flex-1 p-8">
      {children}
    </main>
  );
};

export default DashboardPage;
