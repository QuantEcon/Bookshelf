export const getParamByName = (name, url) => {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const parseResponse = (response) => {
    let json = response.json();
    if (response.status >= 200 && response.status <= 300) {
        return json;
    } else {
        return json.then(err => Promise.reject(err));
    }
}