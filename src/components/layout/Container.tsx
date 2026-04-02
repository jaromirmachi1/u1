import styled from 'styled-components'

export const Container = styled.div`
  width: min(100% - 52px, ${({ theme }) => theme.layout.maxWidth});
  margin-inline: auto;

  @media (max-width: 768px) {
    width: min(100% - 30px, ${({ theme }) => theme.layout.maxWidth});
  }
`
