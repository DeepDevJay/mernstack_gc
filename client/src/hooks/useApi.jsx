import { useState} from 'react';
import API from '../services/api';

const useApi = (urlObject) => {
    const [res, setRes] = useState(null);
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const call = async (payload, type = '') => {
        setRes(null);
        setErr("");
        setIsLoading(true);

        try {
            let response = await API(urlObject, payload, type);
            setRes(response.data);
        } catch(err) {
            setErr(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { call, res, err, isLoading };
}

export default useApi;