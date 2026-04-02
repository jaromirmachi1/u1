import styled from 'styled-components'
import { projects } from '../../data/mockData'
import { Container } from '../layout/Container'
import { Reveal } from '../motion/Reveal'
import { Card, CardBody, CardImage } from '../ui/Card'
import { Eyebrow, Section, SectionTitle } from '../ui/Section'

const Split = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`

const FloatCard = styled(Card)`
  transform: translateY(0);
`

export const ReferencesSection = () => (
  <Section>
    <Container>
      <Reveal>
        <Eyebrow>Selected references</Eyebrow>
        <SectionTitle>Asymmetric project wall.</SectionTitle>
      </Reveal>
      <Split>
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.07}>
            <FloatCard>
              <CardImage
                $src={project.image}
                $height={i % 2 === 0 ? '360px' : '280px'}
              />
              <CardBody>
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </CardBody>
            </FloatCard>
          </Reveal>
        ))}
      </Split>
    </Container>
  </Section>
)
