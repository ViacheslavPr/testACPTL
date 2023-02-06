import {SpinnerContainer} from "../dashboard-page-styles";

const Spinner = (): JSX.Element => {
  return <SpinnerContainer>
    <div className="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </SpinnerContainer>
}

export default Spinner;