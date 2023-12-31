import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1%;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`
export const HistoryList = styled.main`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  &::-webkit-scrollbar {
    width: 0.875rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['gray-500']};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme['gray-800']};
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`
const STATUS_COLOR = {
  yellow: 'yellow-500',
  green: 'green-500',
  red: 'red-500',
} as const
interface StatusProps {
  statusColor: keyof typeof STATUS_COLOR
}
export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background-color: ${(props) =>
      props.theme[STATUS_COLOR[props.statusColor]]};
  }
`
export const NoDataContainer = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme['gray-600']};
  padding: 1rem;
  text-align: left;
  color: ${(props) => props.theme['gray-100']};
  border-radius: 8px;

  svg {
    margin-bottom: 0%.875rem;
  }

  span {
    color: var(--gray-300);
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`
