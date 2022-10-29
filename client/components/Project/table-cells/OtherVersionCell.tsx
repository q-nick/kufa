import type { ReactNode } from 'react';

import type { DependencyInstalledExtras } from '../../../../server/types/dependency.types';
import { FindOtherVersion } from '../components/FindOtherVersions/FindOtherVersion';

export const OtherVersionCell = (
  dependency: DependencyInstalledExtras,
): ReactNode => {
  return <FindOtherVersion dependency={dependency} />;
};
