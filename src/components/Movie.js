import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
// import { Card, Image, Icon } from 'semantic-ui-react';

const LIKE_MOVIE = gql`
    mutation LikeMovie($id: Int!, $isLiked: Boolean!) {
        LikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;

export default ({ id, bg, rating, isLiked }) => {
    const [LikeMovie] = useMutation(LIKE_MOVIE, {
        variables: { id: parseInt(id), isLiked },
    });

    return (
        <Wrapper>
            <MovieWrapper>
                <Link to={`/movie/${id}`}>
                    <Poster src={bg} />
                    <Overlay>
                        <Button>Learn More</Button>
                    </Overlay>
                </Link>
            </MovieWrapper>
            <Content>
                <Rating>
                    <span role='img' aria-label='rating'>
                        ⭐️
                    </span>
                    {rating}
                </Rating>
                <Like>
                    <div
                        onClick={LikeMovie}
                        style={{ zIndex: '10', backgroundColor: 'black' }}
                    >
                        {isLiked ? (
                            <i
                                className='fas fa-heart'
                                style={{ color: 'red' }}
                            ></i>
                        ) : (
                            <i
                                className='far fa-heart'
                                style={{ color: 'red' }}
                            ></i>
                        )}
                    </div>
                </Like>
            </Content>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    display: block;
    position: relative;
`;
const MovieWrapper = styled.div`
    display: block;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding-top: 1.5em;

    :hover {
        cursor: pointer;
    }
`;
const Poster = styled.img`
    width: 100%;
    height: auto;
`;
const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    height: auto;
`;
const Rating = styled.div`
    color: white;
`;
const Like = styled.div`
    background-color: black;
    :hover {
        cursor: pointer;
    }
`;

const Overlay = styled.div`
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    opacity: 0;
    -webkit-transition: 0.5s ease;
    -o-transition: 0.5s ease;
    transition: 0.5s ease;
    :hover {
        opacity: 0.8;
        background-color: black;
    }
`;
const Button = styled.div`
    display: block;
    position: absolute;
    color: white;
    font-weight: bold;
    top: 50%;
    left: 50%;
    // min-width: 200px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;
    transition: background-color 0.2s ease-in-out;
    :hover {
        color: black;
        background-color: white;
        transition: background-color 0.5s ease-in-out;
    }
`;
