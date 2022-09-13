import styled, { css } from 'styled-components';

import type { CSSType } from '../../../Styled';

export const Wrapper = styled.div`
  position: relative;
`;

interface ExplorerListProps {
  isOpen: boolean;
}

export const ExplorerList = styled.ul`
  position: absolute;
  background: #3e3f3a;
  right: 0;
  top: 100%;
  z-index: 1;
  max-height: 0;
  max-width: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  transition: max-width 300ms, max-height 300ms;
  width: 250px;

  ${({ isOpen }: ExplorerListProps): CSSType =>
    isOpen &&
    css`
      border-color: #dfd7ca;
      max-height: 80vh;
      max-width: 250px;
      overflow-y: scroll;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    `}
`;

export const Description = styled.p`
  color: #dfd7ca;
  display: inline-block;
  font-size: 0.9em;
  font-weight: 400;
  margin: 0;
`;

interface ExplorerButtonProps {
  isDirectory: boolean;
  isProject?: boolean;
}

export const ExplorerButton = styled.button<ExplorerButtonProps>`
  color: #fff;
  background: none;
  font-size: 12px;
  font-weight: 500;
  border: 0;
  display: inline-block;
  width: 100%;
  text-align: left;
  padding: 0 8px;

  &:hover {
    text-decoration: underline;
    background: #8e8c84;
  }

  ${({ isDirectory }: ExplorerButtonProps): CSSType =>
    isDirectory &&
    css`
      max-height: 80vh;
      max-width: 100%;
    `}

  ${({ isProject }: ExplorerButtonProps): CSSType =>
    isProject === true &&
    css`
      color: #d9534f;

      :hover {
        color: #000;
      }
    `}

  &:disabled {
    color: #8e8c84;
    background: none;
    text-decoration: none;
    cursor: not-allowed;
  }
`;

export const ExplorerFile = styled.span`
  color: #8e8c84;
  font-size: 12px;
  font-weight: 500;
  padding: 0 8px;
`;

export const ExplorerCurrentLocation = styled.span`
  color: #8e8c84;
  font-size: 12px;
  font-weight: 500;
  padding: 0 3px;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  direction: rtl;
  display: block;
`;

export const ExplorerSearch = styled.input`
  display: block;
  background: transparent;
  border: 1px solid black;
  margin: 3px 3px 0 3px;
  width: calc(100% - 6px);
  color: white;
  border-radius: 0;
`;
