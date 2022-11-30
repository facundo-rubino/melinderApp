import { useEffect, useState } from 'react';

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('No se pudieron recibir los datos')
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                console.log('error', err);
                setLoading(false);
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [url]);

    return { data, loading, error }
}



export default useFetch  