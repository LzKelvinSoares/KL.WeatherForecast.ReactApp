import { Wrapper } from './styles';

export default function HeaderCP({children}) {
    return (
        <Wrapper>
            <h2>{children}</h2>
        </Wrapper>
    );
}