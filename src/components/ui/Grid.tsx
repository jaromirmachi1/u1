import styled from 'styled-components'

export const Grid = styled.div<{ $min?: string }>`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(${({ $min }) => $min ?? '260px'}, 1fr));
`
