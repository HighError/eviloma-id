import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import React, { useState } from 'react';

import Connection from '../../components/Connection';
import AnimatedLayout from '../../components/layouts/AnimatedLayout';
import OnlyForAuth from '../../components/routesControllers/OnlyForAuth';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AnimatedLayout title="Eviloma ID - З'єднання">
      <OnlyForAuth>
        <div className="grid grid-cols-1 gap-6 px-4 pb-3 pt-24 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
          <Connection icon={faDiscord} title="Discord" slug="discord" />
        </div>
      </OnlyForAuth>
    </AnimatedLayout>
  );
}
