import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { axiosReq } from '../../api/axiosDefaults'
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css"


const PopularRecipes = () => {
    const [recipeData, setRecipeData] = useState({
        popularRecipes: {results : []},

    })
    const {popularRecipes} = recipeData;
    

    useEffect (() => {
        const handleMount = async () => {
            try {
                const {data} = await axiosReq.get(
                    '/likes/?ordering=likes_count'
                )

                console.log(data)
                setRecipeData(prevState => ({
                    ...prevState,
                    popularRecipes: data,
                }))
            }catch(err){
                console.log(err)
            }
        }
        handleMount()
    },[])


  return (
    <Container className={appStyles.Content}>
        {popularRecipes.results.length ?(
            <>
            <p>You liked the most</p>
        {popularRecipes.results.map(likes => (
            <p key={likes.id}>{likes.recipe}</p>
        ))}
            </>
        ): (
            <Asset spinner/>
        )
        }

    </Container>
  )
}

export default PopularRecipes