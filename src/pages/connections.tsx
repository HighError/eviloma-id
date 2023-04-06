import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';

import Header from '@/components/Header';

import Connection from '../components/Connection';
import Layout from '../components/Layout';
import OnlyForAuth from '../components/routesControllers/OnlyForAuth';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout title="Eviloma ID - З'єднання">
      <OnlyForAuth>
        <Header isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="grid grid-cols-1 gap-6 px-4 pb-3 pt-24 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          <Connection icon={faDiscord} title="Discord" slug="discord" />
        </div>
      </OnlyForAuth>
    </Layout>
  );
}
