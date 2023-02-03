import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { Link } from "react-router-dom";
import {getBreeds, deleteBreed} from "../redux/breedsActions";


export default function AllCards() {
    let breedsState= useSelector ((state) => state.breeds)
    const dispatch = useDispatch()

function handleClick (id){
    dispatch(deleteBreed(id)) 
        dispatch(getBreeds())
}


    useEffect(()=>{
        dispatch(getBreeds())
    }, [dispatch])

    return (
        <>
         <div>
            {breedsState.length > 0 ? breedsState.map(breed =>
            <Link key={breed.id}to={`/dogs/${breed.id}`}>
              <Card image={breed.image} 
                    name={breed.name} 
                    temperament={breed.temperament} 
                    weight={breed.weight} />
                 <button onClick={() => handleClick(breed.id)} >Delete Breed</button>   
            </Link>
            
                ) : <h2>There is nothing</h2>}
         </div>
        </>
    )

}