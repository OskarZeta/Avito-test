import React from 'react';
import HeaderError from './headers/HeaderError';
import Content from './Content';

const ErrorComponent = ({ error }) => 
  <>
    <HeaderError />
    <Content>
      <span>{error.toString()}</span>
    </Content>
  </>
  
export default ErrorComponent;