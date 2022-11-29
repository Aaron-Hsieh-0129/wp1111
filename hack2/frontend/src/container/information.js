/****************************************************************************
  FileName      [ information.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the information of restaurant ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React from 'react'
import Stars from '../components/stars';
import '../css/restaurantPage.css'

const Information = ({ info, rating }) => {

    const getTag = (tags) => {
        // {/* TODO Part III-2-a render tags */}
        // eslint-disable-next-line no-lone-blocks
        return (
            tags.map((tag) => {
                return (
                    <div className='tag' key={tag}>
                        {tag}
                    </div>
                )
            })
        )
    }
    const getPriceTag = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (
            <div className="tag">
                {/* TODO Part III-2-a render price tags; hint: convert price number to dollar signs first */}
                {priceText}
            </div>
        )
    }

    const getBusiness = (time) => {
        const day = ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"]
        const func = () => (
            day.map((key, i) => {
                return (
                    <div className='singleDay' key={key}>
                        <div className='day'>{key}</div>
                        <div className='time'>{time["All"] ? time["All"] : (time[key] ? time[key] : "Closed")}</div>
                    </div>
                )
            })
        )
        return (
            <div className='businessTime'>
                {/* TODO Part III-2-c: render business time for each day*/}
                {   
                    func()
                }
            </div>
        )
    }

    return (
        <div className='infoContainer'>
            <h2>{info.name}</h2>
            <div className='infoRow'>
                <div className='rate'>
                    {rating === 0 ? <p>No Rating</p> : <Stars rating={rating} displayScore={true} />}

                </div>
                <div className='distance'>{info.distance / 1000} km</div>
            </div>
            <div className='infoRow'>
                {getPriceTag(info.price)}
                {getTag(info.tag)}
            </div>
            <h5>Business hours:</h5>
            {getBusiness(info.time)}
        </div>
    )
}
export default Information