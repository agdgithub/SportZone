import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('DebitCard');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
        </Form.Group>
        <Row>
          <Col>
            <Form.Check
              type='radio'
              label='Debit or Credit Card'
              id='DebitCard'
              name='paymentMethod'
              value='DebitCard'
              checked={paymentMethod === 'DebitCard'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Form.Check
              type='radio'
              label='Cash on delivery'
              id='Cashondelivery'
              name='paymentMethod'
              value='Cashondelivery'
              checked={paymentMethod === 'Cashondelivery'}
              onChange={e => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Row> */}

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;


