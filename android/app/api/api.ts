const api_url = 'http://10.0.2.2:8000/';

interface filterData {
    categories: Array<string>,
    deliveryOnly: boolean,
    veggieOnly: boolean,
    priceMax: number,
    distanceMax: number,
}

export const fetchData = async (filterData: filterData) => { // Test function
    try {
        const { categories, deliveryOnly, veggieOnly, priceMax, distanceMax } = filterData;
        const pyFilterData = { // Formatting in Python convention
            categories: categories,
            delivery_only: deliveryOnly,
            veggie_only: veggieOnly,
            max_price: priceMax,
            max_distance: distanceMax,
        };

        const response = await fetch(api_url+'get_filtered_data/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pyFilterData),
        });        
        const data = await response.json();
        console.log("Data fetched: ", JSON.stringify(data, null, 2));
    } catch (error) {
        console.log("Error while fetching data: ", error);
    };
};