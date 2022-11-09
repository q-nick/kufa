import { useIsMutating, useQuery } from '@tanstack/react-query';

// import { useProjectsJobs } from '../app/ContextStore';
import { getProjectDependenciesFast } from '../service/dependencies.service';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const useFastDependencies = (projectPath: string) => {
  // const { startJob, successJob } = useProjectsJobs(projectPath);

  const isProjectMutating = useIsMutating([projectPath]) > 0;

  const query = useQuery(
    [projectPath, 'get-project-dependencies', 'fast'],
    async () => {
      // const id = startJob('Get project dependencies fast');

      const dependencies = await getProjectDependenciesFast(projectPath);

      // successJob(id);

      return dependencies;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: !isProjectMutating,
      retry: false,
    },
  );

  return { dependencies: query.data, ...query };
};
