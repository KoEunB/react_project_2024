//게시글 입력 화면
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import usePosts from "./UsePosts";

const Container = styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;   
    align-items: center;       
    height: 100vh;             
    text-align: center;  
`;

const H2 = styled.h2`
    font-size: 17px;
    margin-bottom: 5px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; 
    margin-bottom: 1rem; 
`;

const Input = styled.input`
    padding: 5px;
    font-size: 16px;
    width: 300px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid gray;

    &::placeholder {
        font-size: 13px;
    }
`;

const Textarea = styled.textarea`
    padding: 9px;
    font-size: 16px;
    width: 300px;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid gray;
    resize: none; 
    overflow: hidden; 
    min-height: 40px; 

    &::placeholder {
        font-size: 14px; 
        color: gray;     
    }
`;

const InputButton = styled.button`
    padding: 5px;
    font-size: 16px;
    width: 100px;
    text-align: center;
    background-color: #8D8D8D;
    color: white;
    border-radius: 8px;
    border: none;
    transition: 0.2s ease-in;
    cursor: pointer;

    &:hover {
        transform: scale(1.02);
    }
`;

function InputPost() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { addPost } = usePosts();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onTitleChange = (event) => setTitle(event.target.value);
    const onContentChange = (event) => setContent(event.target.value);

    const onButtonClick = async (event) => {
        event.preventDefault();
        const newPost = await addPost(Number(id), title, content);
        navigate(`/post/${newPost.id}`);
    };

    return (
        <Container>
            <InputContainer>
                <H2>제목</H2>
                <Input
                    onChange={onTitleChange}
                    value={title}
                    type="text"
                    placeholder="게시물 제목을 입력하세요." />
            </InputContainer>

            <InputContainer>
                <H2>본문</H2>
                <Textarea
                    onChange={onContentChange}
                    value={content}
                    placeholder="본문을 입력하세요." />
            </InputContainer>

            <button onClick={onButtonClick}>확인</button>
        </Container>
    );
}

export default InputPost;