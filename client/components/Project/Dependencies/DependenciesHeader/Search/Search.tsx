/* eslint-disable react/jsx-no-useless-fragment */
import type { ReactNode, VFC } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SearchResponse } from '../../../../../../server/types/global.types';
import { Dropdown } from '../../../../../ui/Dropdown/Drodpown';
import type { Props as TableProps } from '../../../../../ui/Table/Table';
import { Table } from '../../../../../ui/Table/Table';
import { ZERO } from '../../../../../utils';
import { HomePageCell } from '../../table-cells/HomePageCell';
import { NpmCell } from '../../table-cells/NpmCell';
import { RepoCell } from '../../table-cells/RepoCell';
import { TimeCell } from '../../table-cells/TimeCell';
import { SearchForm } from './SearchForm';
import { SearchInstall } from './SearchInstall';
import { useSearch } from './use-search';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  z-index: 5;
`;

// eslint-disable-next-line @typescript-eslint/no-type-alias
const columns: TableProps<SearchResponse[number]>['columns'] = [
  {
    name: 'name',
    sortable: true,
    render: (result): ReactNode => <b>{result.name}</b>,
  },
  {
    name: 'version',
    label: 'latest',
    sortable: true,
    render: (searchItem): ReactNode => (
      <SearchInstall searchItem={searchItem} />
    ),
  },
  {
    name: 'score',
    sortable: true,
    render: (result): ReactNode => `${(result.score * 100).toFixed(2)}%`,
  },
  { name: 'updated', sortable: true, render: TimeCell },
  {
    name: 'homepage',
    label: '',
    render: HomePageCell,
  },
  {
    name: 'repository',
    label: '',
    render: RepoCell,
  },
  {
    name: 'npm',
    label: '',
    render: NpmCell,
  },
];

export const Search: VFC = () => {
  const { searchResults, onSearch } = useSearch();

  return (
    <Wrapper>
      <Dropdown>
        {(onToggleOpen): ReactNode => (
          <>
            <SearchForm
              onSubmit={(query): void => {
                onSearch(query);
                onToggleOpen(true);
              }}
              searchResults={searchResults}
            />
          </>
        )}
        {(): ReactNode => (
          <>
            {searchResults.length > ZERO && (
              <Table
                columns={columns}
                filters={{}}
                isEmpty={false}
                maxHeight="calc(100vh - 175px)"
                tableData={searchResults}
              />
            )}
          </>
        )}
      </Dropdown>
    </Wrapper>
  );
};
