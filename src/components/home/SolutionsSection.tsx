import { useId, useState } from 'react'
import styled from 'styled-components'
import { solutionGroups } from '../../data/solutions'
import { Container } from '../layout/Container'
import { Reveal } from '../motion/Reveal'

const Wrap = styled.section`
  padding-block: clamp(88px, 12vw, 140px);
  background: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.solutionsDivider};
`

const Inner = styled(Container)`
  display: grid;
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
  gap: clamp(40px, 8vw, 96px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: clamp(36px, 8vw, 56px);
  }
`

const Aside = styled.div`
  position: sticky;
  top: clamp(100px, 14vh, 140px);

  @media (max-width: 900px) {
    position: static;
    top: auto;
  }
`

const Kicker = styled.p`
  margin: 0 0 12px;
  font-size: 11px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.black};
`

const Title = styled.h2`
  margin: 0 0 18px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(40px, 5.5vw, 72px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.black};
`

const Lead = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.gray700};
  max-width: 34ch;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 40px);
`

const Group = styled.section`
  margin: 0;
  padding: 0;
  border: 0;
`

const GroupLegend = styled.h3`
  margin: 0 0 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.gray500};
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.solutionsDivider};
`

const Row = styled.li`
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.solutionsDivider};
`

const RowButton = styled.button<{ $active: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 14px;
  padding: 16px 4px 16px 0;
  margin: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: clamp(16px, 1.35vw, 18px);
  font-weight: 500;
  letter-spacing: -0.01em;
  color: ${({ $active, theme }) => ($active ? theme.colors.solutionsAccent : theme.colors.black)};
  transition:
    color ${({ theme }) => theme.motion.fast},
    background ${({ theme }) => theme.motion.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.solutionsAccent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.solutionsAccent};
    outline-offset: 4px;
    border-radius: 4px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .arrowSlot {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

const ArrowSlot = styled.span`
  display: inline-flex;
  width: 1.25em;
  justify-content: flex-start;
  font-size: 1.05em;
  color: ${({ theme }) => theme.colors.solutionsAccent};
  opacity: 0.35;
  transform: translateX(-4px);
  transition:
    opacity ${({ theme }) => theme.motion.fast},
    transform ${({ theme }) => theme.motion.fast};

  ${RowButton}[aria-current='true'] &,
  ${RowButton}:hover & {
    opacity: 1;
    transform: translateX(0);
  }
`

const Label = styled.span`
  min-width: 0;
`

const Hint = styled.p`
  margin: 20px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray500};
  max-width: 42ch;
  line-height: 1.5;

  @media (min-width: 901px) {
    display: none;
  }
`

export const SolutionsSection = () => {
  const headingId = useId()
  const [activeKey, setActiveKey] = useState<string | null>(null)

  return (
    <Wrap id="solutions" aria-labelledby={headingId}>
      <Inner>
        <Aside>
          <Reveal>
            <Kicker>What we cover</Kicker>
            <Title id={headingId}>Solutions</Title>
            <Lead>
              Thirteen disciplines, one coordinated interior—from shell to surfaces. Tap a line to
              highlight it; everything stays easy to scan on mobile.
            </Lead>
            <Hint>Tip: use the list to explore scope before we talk specifics.</Hint>
          </Reveal>
        </Aside>

        <Main>
          {solutionGroups.map((group) => (
            <Group key={group.id} aria-label={group.label}>
              <GroupLegend>{group.label}</GroupLegend>
              <List>
                {group.items.map((item) => {
                  const key = `${group.id}:${item}`
                  const active = activeKey === key
                  return (
                    <Row key={key}>
                      <RowButton
                        type="button"
                        $active={active}
                        aria-current={active ? 'true' : undefined}
                        onClick={() => setActiveKey((prev) => (prev === key ? null : key))}
                      >
                        <ArrowSlot className="arrowSlot" aria-hidden>
                          →
                        </ArrowSlot>
                        <Label>{item}</Label>
                      </RowButton>
                    </Row>
                  )
                })}
              </List>
            </Group>
          ))}
        </Main>
      </Inner>
    </Wrap>
  )
}
