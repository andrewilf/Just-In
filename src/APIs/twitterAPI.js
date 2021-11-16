
const headers = {
    "Authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAEqnVQEAAAAAzaaIxbSsv4RSdO2mJe0tOYXTC1w%3DwTxnqx1JTUqdCW9X8SuqdRSOm93I6QfNViLHvrB8QkSellNsRz`,
};

const twitterQueries = "tweets?max_results=5";


const options = {
    method: "GET",
    headers: headers,
};

async function FetchData(userId) {
    const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com`
    const fetchData = async () => {
        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            console.log(data.data);
            const arrData = await data.data.map((element) => ({ mediaType: "Twitter", id: element.id }))
            return arrData
        } catch (err) {
            console.log(err);
        }
    }
    fetchData().then((payload) => {
        console.log(payload)
        return payload
        //const arrPayload = awaitpayload.map((element) => ({ mediaType: "Twitter", id: element }))
        //console.log(arrPayload)
    })
};

export default FetchData;