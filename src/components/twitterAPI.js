import React, { useState, useEffect } from "react";

const headers = {
    "Authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAEqnVQEAAAAAzaaIxbSsv4RSdO2mJe0tOYXTC1w%3DwTxnqx1JTUqdCW9X8SuqdRSOm93I6QfNViLHvrB8QkSellNsRz`,
};

const twitterQueries = "tweets?max_results=5";


const options = {
    method: "GET",
    headers: headers,
};



const FetchData = (userId, setValue) => {
    const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com`
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        const getData = async () => {
            const response = await fetchData();
            setData(response)
            setValue(response["data"])
            //console.log(response["data"])
        };
        getData();
    }, []);

    return (
        data
    );
};

export default FetchData;