import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/layouts/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import getServices from '@/libs/getServices';

export default function Services() {
  const { t } = useTranslation('services');
  const [isLoading, setIsLoading] = React.useState(false);
  const services = getServices();
  return (
    <Layout isLoading={isLoading} setIsLoading={setIsLoading} title={t('title')}>
      <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 ">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            image={service.image}
            href={service.href}
            btnDisable={service.btnDisable}
            btnText={service.btnText}
          />
        ))}
      </div>
    </Layout>
  );
}
