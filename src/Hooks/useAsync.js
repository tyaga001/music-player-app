import { useEffect, useState } from "react";

export default function useAsync(asyncCallback) {
    const [data, setData] = useState({ data: null, error: null });
    useEffect(() => {
        const promise = asyncCallback;
        if (!promise) return;
        (async () => {
            try {
                const resp = await asyncCallback();
                setData({ data: resp.data, error: null });
            } catch (er) {
                setData({ data: null, error: er });
            }
        })();
    }, [asyncCallback]);

    return data;
}
