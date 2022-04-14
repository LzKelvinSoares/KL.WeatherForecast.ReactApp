import styled from 'styled-components';

const FormGroup = styled.form`
    display: flex;
`;

const InputGroup = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    > label {
        font-size: 20px;
        padding-bottom: 10px;
    }
`;

const Input = styled.input`
    width: 500px;
    height: 50px;
    border-radius: 8px; 
    border: 1px solid  ${({ theme }) => theme.default.border};
    margin-right: 10px;
    padding: 5px;
`;

const Button = styled.button`
    width: 100px;
    height: 50px;
    background:  ${({ theme }) => theme.button.background.neutral};
    border: none;
    border-radius: 8px;
    color:  ${({ theme }) => theme.button.color};
    align-self: flex-end;
    margin: 10px 0;
    cursor: pointer;
    transition: all .5s;

    &:disabled {
        background:  ${({ theme }) => theme.button.background.disabled};
        cursor: not-allowed;
        &:hover {
            background:  ${({ theme }) => theme.button.background.disabled};
        }
    }

    &:hover {
        background:  ${({ theme }) => theme.button.background.hover};
    }
`;

export { FormGroup, InputGroup, Input, Button };