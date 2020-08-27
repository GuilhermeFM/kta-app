import styled, { keyframes } from 'styled-components';

import background from '../../assets/background-light.jpg';

import InputText from '../../Components/Forms/InputText';
import InputButton from '../../Components/Forms/InputButton';

const rotateTo90 = keyframes`
  from {
    transform: translateX(-350px);
  },

  to {
    transform: translateX(0px);
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;

  background-image: url(${background});

  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;

  > img {
    margin-bottom: 3rem;
  }

  > form {
    animation: ${rotateTo90} 1.5s forwards;

    @media (min-width: 320px) {
      width: 280px;
    }

    @media (min-width: 360px) {
      width: 300px;
    }

    @media (min-width: 400px) {
      width: 380px;
    }

    display: flex;
    flex-flow: column nowrap;

    > p#title {
      margin-bottom: 2rem;
      font-size: 20px;
      align-self: center;
    }

    > p#description {
      align-self: center;
      font-size: 14px;
      margin-bottom: 2rem;
    }

    > p#footer {
      align-self: center;
      margin-top: 3rem;

      > a {
        color: #000;
        font-weight: bold;
        text-decoration: none;
        cursor: pointer;

        transition: all 0.3s ease;

        :hover {
          color: #5d78ff;
        }
      }
    }

    > div {
      margin-top: 1rem;

      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    }
  }
`;

export const Input = styled(InputText)`
  background-color: rgba(235, 237, 242, 0.4);

  :not(:first-child) {
    margin-top: 1rem;
  }
`;

export const ButtonRequestPassword = styled(InputButton)`
  @media (max-width: 360px) {
    width: 100%;
  }

  width: 150px;
  align-self: center;
  margin-top: 2rem;

  :hover {
    box-shadow: 0px 9px 16px 0px rgba(93, 120, 255, 0.25);
  }
`;

export const ButtonCancel = styled(InputButton)`
  @media (max-width: 360px) {
    width: 100%;
  }

  width: 150px;
  align-self: center;
  margin-top: 2rem;

  color: #282a3c;
  background-color: transparent;
  box-shadow: 0px 4px 16px 0px rgba(153, 153, 153, 0.15);

  :hover {
    background-color: transparent;
    box-shadow: 0px 9px 16px 0px rgba(153, 153, 153, 0.25);
  }
`;