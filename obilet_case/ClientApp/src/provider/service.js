import { browserName, browserVersion } from 'react-device-detect';

export function FetchPost(apiLink, data) {
    return new Promise(async (resolve, reject) => {
        fetch(apiLink, {
            method: 'post', headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'X-Fingerprint': await fingerprint()
                //'User-Agent': getUA
            }, body: JSON.stringify(data)
        }).then(response => {
            if (response.status !== 201 && response.status !== 202 && response.status !== 200) {
                reject(response);
            }
            else {
                resolve(response);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export function FetchGet(apiLink) {
    return new Promise(async (resolve, reject) => {
        fetch(apiLink, {
            method: 'get', headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'X-Fingerprint': await fingerprint()
                //'User-Agent': getUA
            }
        }).then(response => {
            if (response.status !== 200 && response.status !== 201) {
                reject(response);
            }
            else {
                resolve(response);
            }
        }).catch(error => {
            reject(error);
        });
    });
}

export const GetSession = () => {
    return new Promise(async (resolve, reject) => {
        var ipAddress = await (await (await FetchGet('https://api.ipify.org/?format=json')).json()).ip;
        var postData = {
            type: 1,
            connection: { ip_address: ipAddress, port: window.location.port },
            browser: { name: browserName, version: browserVersion }
        };
        FetchPost(`obilet/getsession`, postData)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                resolve(JSON.parse(data));
            })
            .catch(() => resolve({}));
    })
}

export const GetBusLocations = o_session => {
    return new Promise((resolve, reject) => {
        FetchPost(`obilet/getbuslocations`, o_session)
            .then(response => response.json())
            .then(data => {
                var newData = JSON.parse(data);
                if (newData.status && newData.status === 'Success') {
                    resolve(newData.data);
                }
                resolve([]);
            })
            .catch(() => resolve([]));
    })
}

export const GetJourneys = data => {
    return new Promise((resolve, reject) => {
        FetchPost(`obilet/getjourneys`, data)
            .then(response => response.json())
            .then(data => {
                var newData = JSON.parse(data);
                if (newData.status && newData.status === 'Success') {
                    resolve(newData.data);
                }
                resolve([]);
            })
            .catch(() => resolve([]));
    })
}