import service from "./index";

const request = async (axiosConfig: any) => {
    return new Promise((resolve, reject) => {
        service(axiosConfig)
        .then((response) => {
            const result = response;
            resolve({
                status: true,
                result: result
            });
        })
        .catch(async(error) => {
            reject({
                status: false,
                result: null
            });
        });
    });
};

export default request;
