import React from 'react';
import styled from 'styled-components'

export default styled.section`
	margin: 0px;
  margin-left: ${props => props.marginleft ? props.marginleft : '0px'};
`;

