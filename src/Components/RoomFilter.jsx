import React from "react";
import {useContext} from "react";
import {RoomContext} from "../Context";
import Title from "../Components/Title";

//get all unique values
const getUnique = (items, value ) =>{
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}){
    const context = useContext(RoomContext);
    const {
        handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets
    } = context;

    //Room Type
    // get unique types
    let types = getUnique(rooms, "type");
    //add all
    types = ["all", ...types];
    //map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })
    //end Room Type

    //Guests
    let people = getUnique(rooms, "capacity");
    people = people.map((item, index) =>{
        return <option key={index} value={item}>{item}</option>
    })
    //end Guests

    return(
        <section className="filter-container">
            <Title title="search rooms"/>
            <form className="filter-form">
                {/* Room Type */}
                <div className="form-group">
                    <label htmlFor="type">room type</label>
                    <select name="type" id ="type" value={type} className="form-control" onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end of Room Type */}
                {/* Guests */}
                <div className="form-group">
                    <label htmlFor="capacity">guests</label>
                    <select name="capacity" id ="capacity" value={capacity} className="form-control" onChange={handleChange}>
                        {people}
                    </select>
                </div>
                {/* end of Guests */}
                {/* Price */}
                <div className="form-group">
                    <label htmlFor = "price">
                        room price ${price}
                    </label>
                    <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} className="form-control"/>
                </div>
                {/* end Price */}
                {/* Size */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className ="size-inputs">
                        {/* <p>Min: </p> */}
                        <input type="number" name="minSize" id="size" value={minSize} onChange={handleChange} className="size-input"/>
                        {/* <p>Max: </p> */}
                        <input type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} className="size-input"/>
                    </div>
                </div>
                {/* end Size */}
                {/* Extras */}
                <div className="form-group">
                    <div className="single-extra">
                        <input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange}/>
                        <label htmlFor="breakfast">breakfast</label>
                    </div>
                    <div className="single-extra">
                        <input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange}/>
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                {/* end Extras */}
            </form>
        </section>
    )
}