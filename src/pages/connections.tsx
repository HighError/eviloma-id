import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import React, { useContext } from 'react';

import Connection from '@/components/Connection';
import Layout from '@/components/layouts/Layout';
import { UserContext } from '@/contexts/userContext';

export default function Connections() {
  const { user } = useContext(UserContext);

  return (
    <Layout title="Connections">
      <div className="mx-auto mt-5 max-w-sm rounded-lg bg-gray-900 px-4 py-2 tablet:max-w-2xl">
        <h2 className="mt-3 text-center">Connections</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Connection title="Discord" slug="discord" icon={faDiscord} status={user?.discord ?? undefined} />
        </div>
      </div>
    </Layout>
  );
}
