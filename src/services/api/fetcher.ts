import { HttpStatus } from "../../models/http-status.enum";

const fetcher = async<T> (url: string, validationFn: (response: T) => boolean, notFoundMessage: string) => fetch(url)
    .then((res) => res.json())
    .then((response: T) => {
        if (validationFn(response)) {
            return { status: HttpStatus.OK, data: response };
        } else {
            return {
                data: notFoundMessage,
                status: HttpStatus.NOTFOUND
            };
        }
    })
    .catch((error) => {
        console.error(error);
        return {
            data: 'An error has occured',
            status: HttpStatus.BADREQUEST
        };
    });

export default fetcher;