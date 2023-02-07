import styled from 'styled-components';

export const ContainerTitle = styled.div`
  display: flex;
  position: relative;
  background-color: ${({theme}) => theme.paletta.darkGray};
  justify-content: center;
  align-items: center;
  padding: 14px 1.15rem;
  color: #fff;
  font-size: 24px;
`

export const ContainerFilters = styled.div`
  padding: 14px;
  display: flex;
  
  select {
    width: 300px;
    margin-right: 20px;
  }
`
export const Table = styled.table`
  width: 100%;
  margin-bottom: 16px;
  color: #0A2F5A;

  tr,
  th,
  td {
    &[role="presentation"] {
      cursor: pointer;
    }
  }

  a {
    color: #3A5371;
    &:hover {
      text-decoration: underline;
    }
  }

  th,
  td {
    border-bottom: 1px solid #E5EBF4;
    padding: 16px;
    vertical-align: middle;
    min-height: 48px;
    text-align: left;
  }
  
  .cell {
    &-right {
      text-align: right;
    }
    
    &-action {
      width: 110px;
    }
  }

  .header {
    &__sort {
      &-asc:hover,
      &-desc:hover {
        cursor: pointer;

        &::after {
          opacity: 1;
        }
      }

      &-asc::after {
        display: inline-block;
        margin-left: 0.255em;
        vertical-align: 0.255em;
        content: "";
        border-top: 0;
        border-right: 0.3em solid transparent;
        border-bottom: 0.3em solid;
        border-left: 0.3em solid transparent;
        opacity: 0;
      }

      &-desc::after {
        display: inline-block;
        margin-left: 0.255em;
        vertical-align: 0.155em;
        content: "";
        border-top: 0.3em solid;
        border-right: 0.3em solid transparent;
        border-bottom: 0;
        border-left: 0.3em solid transparent;
        opacity: 0;
      }

      &-asc,
      &-desc {
        &--selected {
          &::after {
            opacity: 1;
          }
        }
      }
    }
  }
`

export const SpinnerContainer = styled.div`
  width: 100%;
  text-align: center;
  
  .lds-spinner {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }
  .lds-spinner div {
    transform-origin: 20px 20px;
    animation: lds-spinner 1.2s linear infinite;
  }
  .lds-spinner div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 1.5px;
    left: 18.5px;
    width: 3px;
    height: 9px;
    border-radius: 20%;
    background: #000;
  }
  .lds-spinner div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  .lds-spinner div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  .lds-spinner div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  .lds-spinner div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  .lds-spinner div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  .lds-spinner div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  .lds-spinner div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  .lds-spinner div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  .lds-spinner div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  .lds-spinner div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  .lds-spinner div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  .lds-spinner div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
  @keyframes lds-spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export const ActionIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 80%;
  
  :hover {
    opacity: 100%;
    cursor: pointer;
  }
`

export const ButtonContainer = styled.span`
  display: flex;
  align-items: center;
`
export const ButtonAdd = styled.button`
  
`

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
`

export const FormErrorMessage = styled.div`
  color: red;
  font-size: 12px;
`