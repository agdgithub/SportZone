import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
      <div className="search-box-wrapper" style={{ display: 'flex' }}>
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search ..."
          className="search-box-input"
          style={{ borderRadius: '50px 0 0 50px', marginRight: '-1px' }}
        />
        <Button type="submit" variant="outline-success" className="search-box-button" style={{ borderRadius: '0 50px 50px 0' }}>
          <FiSearch size={20} style={{ color: 'white' }} />
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;












