import styled from 'styled-components'

export const Card = styled.article`
  position: relative;
  isolation: isolate;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);
  transition:
    transform ${({ theme }) => theme.motion.fast},
    box-shadow ${({ theme }) => theme.motion.fast},
    border-color ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(148, 148, 170, 0.42);
    box-shadow: 0 14px 30px rgba(24, 25, 39, 0.12);
  }
`

export const CardImage = styled.div<{ $src: string; $height?: string }>`
  width: 100%;
  height: ${({ $height }) => $height ?? '250px'};
  background-image: linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.02)), url(${({ $src }) => JSON.stringify($src)});
  background-position: center;
  background-size: cover;
  transition: transform ${({ theme }) => theme.motion.smooth}, filter ${({ theme }) => theme.motion.smooth};

  ${Card}:hover & {
    transform: scale(1.018);
    filter: saturate(1.02) contrast(1.01);
  }
`

export const CardBody = styled.div`
  padding: 22px;
`
