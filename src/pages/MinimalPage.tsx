import styled from 'styled-components'
import { Container } from '../components/layout/Container'
import { Section, SectionTitle } from '../components/ui/Section'

const Text = styled.p`
  max-width: 700px;
  color: ${({ theme }) => theme.colors.gray700};
`

export const MinimalPage = ({ title }: { title: string }) => (
  <Section>
    <Container>
      <SectionTitle>{title}</SectionTitle>
      <Text>Page skeleton is prepared and ready for deeper content and module expansion.</Text>
    </Container>
  </Section>
)
