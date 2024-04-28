import { useState, useCallback } from 'react';

type RequestOptions<P, B> = {
    params?: P;
    body?: B;
};

const useApiRequest = <P, B>() => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | JSX.Element>(null);

    const sendRequest = useCallback(async (
        requestFunction: (options: RequestOptions<P, B>) => Promise<any>,
        options: RequestOptions<P, B> = {}
    ) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await requestFunction(options);
            setIsLoading(false);
            return result;
        } catch (err: any) {
            setError(
                <div className="alert alert-danger">
                    <h4>Ooopss....</h4>
                    {/* <ul className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}

                    </ul> */}
                </div>
            );
            setIsLoading(false);
            throw err;
        }
    }, []);

    return { isLoading, error, sendRequest };
}

export default useApiRequest;