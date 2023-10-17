import service from "./index";

const request = async (config: any) => {
    return new Promise((resolve, reject) => {
        service(config)
        .then((response) => {
            resolve(response);
        })
        .catch(async(error) => {
            reject(error);
        });
    });
};

export default request;