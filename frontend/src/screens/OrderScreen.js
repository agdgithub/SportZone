import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    order.totalPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!order || order._id !== id || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id, order, successPay, successDeliver, navigate, userInfo]);

  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handlePayment = () => {
    setShowPaymentFields(true);
  };

  const handlePayNow = () => {
    const paymentResult = {
      cardNumber,
      cvv,
    };
    setPaymentProcessing(true);
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h3>Order {order._id}</h3>
          <Row>
            <Col md={8}>
              <Card>
                <Card.Header className="bg-primary text-white">
                  <h5>Shipping</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p>
                        <strong>Name: </strong> {order.user.name}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                      </p>
                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <Message variant="success">Delivered on {order.deliveredAt}</Message>
                      ) : (
                        <Message variant="danger">Not Delivered</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header className="bg-primary text-white">
                  <h5>Payment Method</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <Message variant="success">Paid on {order.paidAt}</Message>
                      ) : (
                        <Message variant="danger">Not Paid</Message>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card className="mt-4">
                <Card.Header className="bg-primary text-white">
                  <h5>Order Items</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <ListGroup.Item key={index}>
                            <Row>
                              <Col md={2}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                              </Col>
                              <Col>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                              </Col>
                              <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                              </Col>
                            </Row>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Header className="bg-primary text-white">
                  <h5>Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {!order.isPaid && !showPaymentFields && userInfo && order.user._id === userInfo._id && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={handlePayment}
                          disabled={paymentProcessing}
                        >
                          Pay
                        </Button>
                      </ListGroup.Item>
                    )}
                    {showPaymentFields && (
                      <ListGroup.Item>
                        <h5>Payment</h5>
                        <Form>
                          <Form.Group controlId="cardNumber">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter card number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              required
                            />
                          </Form.Group>

                          <Form.Group controlId="cvv">
                            <Form.Label>CVV</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter CVV"
                              value={cvv}
                              onChange={(e) => setCVV(e.target.value)}
                              required
                            />
                          </Form.Group>

                          <Button
                            type="button"
                            className="btn btn-block"
                            onClick={handlePayNow}
                            disabled={paymentProcessing}
                          >
                            {paymentProcessing ? null : 'Pay Now'}
                          </Button>
                        </Form>
                      </ListGroup.Item>
                    )}
                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                          Mark as delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
