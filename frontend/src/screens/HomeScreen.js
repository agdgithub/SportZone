import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Row, Col, Container } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const { keyword } = useParams();
  // const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      {/* <h1 className="my-4">Latest Products</h1> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className="product-row">
          {products && products.map(product => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="product-col">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomeScreen;
