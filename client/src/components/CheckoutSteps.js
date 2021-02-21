import React from 'react';

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Welcome</div>
      <div className={props.step2 ? 'active' : ''}>Address</div>
      <div className={props.step3 ? 'active' : ''}>Shipping</div>
      <div className={props.step4 ? 'active' : ''}>Payment</div>
    </div>
  );
}