import axios from "axios";

const client = axios.create({ baseURL: 'http://localhost:4000' }) //an axios client
//baseUrl: our json-server url

export const request = ({ ...options }) => {  // the 'request' function wraps the axios request and accepts all the options that axios accepts
    client.defaults.headers.common.Authorization = `Bearer token`; // now we can find this bearer token in the header
    const onSuccess = (response) => response;
    const onError = (error) => {
        //optionally you can add additional logging here (if there is an error redirect the home page or etc.)
        return error
    }

    return client(options).then(onSuccess).catch(onError);
}

