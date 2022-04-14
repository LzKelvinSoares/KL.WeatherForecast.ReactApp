import styled from 'styled-components';

const Wrapper = styled.header`
    text-align: center;
    background-color: ${({ theme }) => theme.header.background};
    padding: 20px;
`;

export {Wrapper};