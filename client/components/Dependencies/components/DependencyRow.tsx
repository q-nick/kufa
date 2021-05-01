/* eslint-disable react/no-multi-comp */
import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { Button } from '../../../ui/Button/Button';
import { Loader } from '../../Loader';
import { ConfirmButton } from '../../../ui/ConfirmButton/ConfirmButton';
import type * as Dependency from '../../../../server/types/Dependency';
import type { CSSType } from '../../../Styled';
import { getNormalizedRequiredVersion } from '../../../utils';

interface Props {
  dependency: Dependency.Entire;
  isProcessing: boolean;
  isGlobal: boolean;
  onDeleteDependency: (dependency: Dependency.Entire) => void;
  onInstallDependencyVersion: (dependency: Dependency.Basic, type: Dependency.Type) => void;
}

interface TrStyledProps {
  isProcessing: boolean;
}

const ONE_KB = 1024;
const DIGITS = 2;

const TrStyled = styled.tr`
  @keyframes Gradient {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  ${({ isProcessing }: TrStyledProps): CSSType => isProcessing && css`
    background: linear-gradient(-45deg, #dfd7ca, #fff);
    background-size: 200% 200%;
    animation: Gradient 2s ease infinite;
  `}
`;

const ColumnName = styled.td`
  text-align: left;
  padding-left: 5px;
`;

const ColumnVersion = styled.td`
  width: 10%;
  min-width: 80px;
`;

const ColumnSize = styled.td`
  width: 10%;
  min-width: 80px;
`;

const ColumnAction = styled.td`
  width: 30px;
`;

const RepoName = styled.span`
  border-radius: 2px;
  color: #fff;
  float: right;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.2em 0.4em;
  background: #ef5c0e;
`;

const Missing = styled.span`
  color: #d9534f;
`;

const HealthBadge = styled.img`
  float: right;
  margin-right: 50px;
`;

interface VersionProps {
  dependency: Dependency.Entire;
  isProcessing: boolean;
  onInstall: (version: string) => void;
}

function InstalledVersion({ dependency, isProcessing, onInstall }: VersionProps): JSX.Element {
  const dependencyInstalled = dependency.installed;

  if (dependencyInstalled === undefined) {
    return <Loader />;
  }

  if (dependencyInstalled === null) {
    return <Missing>missing</Missing>;
  }

  if (dependency.type === 'global' || getNormalizedRequiredVersion(dependency.required) === dependencyInstalled) {
    return (
      <span>
        {dependencyInstalled}
      </span>
    );
  }

  return (
    <Button
      disabled={isProcessing}
      icon="cloud-download"
      onClick={(): void => { onInstall(dependencyInstalled); }}
      scale="small"
      title={`Install ${dependencyInstalled} version of ${dependency.name}`}
      variant="success"
    >
      {dependencyInstalled}
    </Button>
  );
}

function WantedVersion({ dependency, isProcessing, onInstall }: VersionProps): JSX.Element {
  const dependencyWanted = dependency.wanted;

  if (dependencyWanted === null) {
    return <>-</>;
  }

  if (typeof dependencyWanted === 'string') {
    return (
      <Button
        disabled={isProcessing}
        icon="cloud-download"
        onClick={(): void => { onInstall(dependencyWanted); }}
        scale="small"
        title={`Install ${dependencyWanted} version of ${dependency.name}`}
        variant="success"
      >
        {dependencyWanted}
      </Button>
    );
  }

  return <></>; // eslint-disable-line
}

function LatestVersion({ dependency, isProcessing, onInstall }: VersionProps): JSX.Element {
  const dependencyLatest = dependency.latest;

  if (dependencyLatest === null) {
    return <>-</>;
  }

  if (typeof dependencyLatest === 'string') {
    return (
      <Button
        disabled={isProcessing}
        icon="cloud-download"
        onClick={(): void => { onInstall(dependencyLatest); }}
        scale="small"
        title={`Install ${dependencyLatest} version of ${dependency.name}`}
        variant="success"
      >
        {dependencyLatest}
      </Button>
    );
  }

  return <></>; // eslint-disable-line
}

interface BundleInfo {
  size: number;
}

export function DependencyRow({
  dependency, isProcessing, onDeleteDependency, onInstallDependencyVersion, isGlobal,
}: Props): JSX.Element {
  const [bundleInfo, setBundleInfo] = useState<BundleInfo | undefined>(undefined);

  useEffect(() => {
    if (typeof dependency.installed === 'string') {
      void fetch(`https://bundlephobia.com/api/size?package=${dependency.name}@${dependency.installed}`)
        .then(async (response) => response.json())
        .then(setBundleInfo);
    }
  }, [dependency.name, dependency.installed]);

  return (
    <TrStyled
      key={`${dependency.name}${dependency.manager}`}
      isProcessing={isProcessing}
    >
      {!isGlobal && (
        <td>{dependency.type !== 'prod' && dependency.type}</td>
      )}

      <ColumnName>
        {dependency.name}

        <RepoName>{dependency.manager}</RepoName>

        <HealthBadge alt="status" src={`https://snyk.io/advisor/npm-package/${dependency.name}/badge.svg`} />
      </ColumnName>

      <ColumnSize>{bundleInfo && `${parseFloat(`${bundleInfo.size / ONE_KB}`).toFixed(DIGITS)}kB` }</ColumnSize>

      {/* <td className={style.columnNsp}> ? </td> */}

      {!isGlobal && (
        <ColumnVersion>
          {dependency.required}

          {typeof dependency.required !== 'string' && <Missing>extraneous</Missing>}
        </ColumnVersion>
      )}

      <ColumnVersion>
        <InstalledVersion
          dependency={dependency}
          isProcessing={isProcessing}
          onInstall={(version): void => {
            onInstallDependencyVersion({ name: dependency.name, version }, dependency.type);
          }}
        />
      </ColumnVersion>

      <ColumnVersion>
        <WantedVersion
          dependency={dependency}
          isProcessing={isProcessing}
          onInstall={(version): void => {
            onInstallDependencyVersion({ name: dependency.name, version }, dependency.type);
          }}
        />
      </ColumnVersion>

      <ColumnVersion>
        <LatestVersion
          dependency={dependency}
          isProcessing={isProcessing}
          onInstall={(version): void => {
            onInstallDependencyVersion({ name: dependency.name, version }, dependency.type);
          }}
        />
      </ColumnVersion>

      <ColumnAction>
        <ConfirmButton
          disabled={isProcessing}
          icon="trash"
          onClick={(): void => { onDeleteDependency(dependency); }}
          scale="small"
          variant="danger"
        />
      </ColumnAction>
    </TrStyled>
  );
}
