import styled from 'styled-components'

export const Section = styled.section`
  padding-block: ${({ theme }) => theme.layout.sectionY};
`

export const Eyebrow = styled.p`
  margin-bottom: 14px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.gray500};
`

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(42px, 6vw, 98px);
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
`
