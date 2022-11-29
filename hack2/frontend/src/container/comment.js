/****************************************************************************
  FileName      [ comment.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [  ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import '../css/restaurantPage.css'
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import Stars from '../components/stars';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const Comment = ({ restaurantId, comments, setComments, setLoad }) => {
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [content, setContent] = useState('')

    const changeRating = (newRating) => {
        setRating(newRating)
    };


    const storeComment = async () => {
            // TODO Part III-3-b: store the comment to the DB
            const tmpID = restaurantId.split('$')[1]
            const {data: { message }} = 
                await instance.post('/createComment', {restaurantId: tmpID, name, content, rating});
            setComments(cur => cur = [...cur, {restaurantId: tmpID, name, content, rating}]);
            setLoad(false);
    }

    const submitComment = (e) => {
        // TODO Part III-3-b: submit a comment and reset input fields
        storeComment();
        setContent('')
        setName('');
        setRating('');
        setLoad(true);
    }
    return (
        <div className='commentContainer'>
            <div className='inputContainer'>
                <div className='title'>
                    <div className='fields'>
                        <input className='name' placeholder='Name' onChange={e => setName(e.target.value)} value={name} />
                        <ReactStars
                            key={`stars_${rating}`}
                            count={5}
                            onChange={changeRating}
                            size={18}
                            activeColor="#ffd700"
                        />
                    </div>
                    <div className='submit'>
                        <button onClick={submitComment}>Submit</button>
                    </div>
                </div>
                <textarea className='content' placeholder='Type your comment' onChange={e => setContent(e.target.value)} value={content} />
            </div>

            <div className='comments'>
                {
                    comments.map((comment) => (
                        <div className='comment' key={comment.name}>
                            <div className='title'>
                                <div className='info'>
                                    <p className='name'> {comment.name} </p>
                                    <Stars rating={comment.rating} displayScore={false} />
                                </div>
                            </div>
                            <p className='content'> {comment.content}</p>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}
export default Comment