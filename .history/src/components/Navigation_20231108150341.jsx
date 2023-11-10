
import React, { useState, useEffect} from "react";

export default Navbar() {

    const [countries, setCountries] = useState([])
    const [ ingredients, setIngredients] = useState([]);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        // fetch countries
        fetch('/api/countries')
          .then(response => response.json())
          .then(data => setCountries(data));
    
        // fetch ingredients
        fetch('/api/ingredients')
          .then(response => response.json())
          .then(data => setIngredients(data));
    
        // fetch ratings - assuming ratings are predefined, for example 1-5
        setRatings([1, 2, 3, 4, 5]);
      }, []);

    return (

    )


}