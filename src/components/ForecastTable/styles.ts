import styled from 'styled-components';

const Container = styled.section`
    border-radius: 8px;
    border: 1px solid  ${({ theme }) => theme.default.border};
    margin: 10px;
`;

const DayGrid = styled.div`
    > div {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        flex-direction: column;

        &.forecast-day-name {
            background-color: ${({ theme }) => theme.default.background};
            border-bottom: 1px solid ${({ theme }) => theme.default.border};
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            display: flex;
            font-weight: 600;
            padding: 15px 5px;
            text-align: left;
        }
    }
`;

const ForecastGrid = styled.div`
    border-bottom: 1px solid  ${({ theme }) => theme.default.border};
    display: grid;
    grid-template-columns: repeat(3, 10%) 50% 20%;
    padding: 0 5px;

    &:last-child {
        border-bottom: none;
    }

    .forecast-property {
        border-right: 1px solid ${({ theme }) => theme.default.border};
        padding: 5px;
        &.forecast-image-container {
            border-right: none;
            display: flex;
            .forecast-image {
                border-radius: 50%;
                margin: auto;
            }
        }
    }
`;

const Loading = styled.div`
    text-align: center;
    margin: 10px;
`;

export { Container, DayGrid, ForecastGrid, Loading };