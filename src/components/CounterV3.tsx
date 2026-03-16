import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #5826FF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: normal;
  margin: 0;
`;

const Count = styled.div`
  color: white;
  font-size: 48px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button<{ variant: 'increment' | 'decrement' }>`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  background-color: ${props => props.variant === 'increment' ? '#FFD600' : '#FF0000'};
  &:hover {
    opacity: 0.9;
  }
`;

const CounterV3: React.FC = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <Container>
      <Title>Counter App</Title>
      <Count>{count}</Count>
      <ButtonContainer>
        <Button variant="increment" onClick={increment}>
          Increment
        </Button>
        <Button variant="decrement" onClick={decrement}>
          Decrement
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default CounterV3;