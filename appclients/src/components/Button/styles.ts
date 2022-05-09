import styled from 'styled-components';

export const Container = styled.button`
    font-weight:bold;
    width:100%;
    padding:0 1.5rem;
    background:var(--green);
    color:#ffff;
    border-radius:0.25rem;
    font-size:1.5rem;
    height:4rem;
    margin:0 auto;
    border:0;
    margin-top:1.5rem;
    &:houver{
        filter: brightness(0.9);
    }
`;
