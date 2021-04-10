import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: auto;
  padding-top: 20px;
`;

export const TopNav = styled.div`
  align-items: center;
  background-color: #bababa;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  i {
    color: tomato;
    font-size: 1.5rem;
  }
  span:hover {
    font-weight: bold;
    i {
      color: #dd0808;
    }
  }
  &:hover {
    border-bottom: 1px solid red;
  }
`;

export const MainNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  justify-content: spase-around;
  div {
    justify-content: spase-around;
  }
  i {
    color: tomato;
    font-size: 1.5rem;
  }
  span:hover {
    font-weight: bold;
    i {
      color: #dd0808;
    }
  }
  &:hover {
    border-bottom: 1px solid red;
  }
`;
