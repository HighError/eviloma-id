import React from 'react';

import Layout from '@/components/layouts/Layout';
import ServiceCard from '@/components/services/ServiceCard';

export default function Services() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Layout isLoading={isLoading} setIsLoading={setIsLoading} title="Eviloma ID - Сервіси">
      <div className="grid grid-cols-1 gap-6 pt-20 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </Layout>
  );
}
