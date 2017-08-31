const settings = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";

const getPopupSize = (provider) => {
    switch (provider) {
        case "facebook":
            return {
                width: 580,
                height: 400
            };
        case "google":
            return {
                width: 452,
                height: 633
            };
        case "github":
            return {
                width: 1020,
                height: 618
            };
        case "twitter":
            return {
                width: 495,
                height: 645
            };
        default:
            return {
                width: 1024,
                height: 618
            }
    }
}

const getPopupOffset = ({
    width,
    height
}) => {
    var windowLeft = window.screenLeft ? window.screenLeft : window.screenX
    var windowTop = window.screenTop ? window.screenTop : window.screenY

    const left = windowLeft + (window.innerWidth / 2) - (width / 2);
    const top = windowTop + (window.innerHeight / 2) - (height / 2)

    return {
        left,
        top
    }
}

const getPopupDimensions = (provider) => {
    const {
        width,
        height
    } = getPopupSize(provider);
    const {
        top,
        left
    } = getPopupOffset({
        width,
        height
    });

    return `width=${width},height=${height},top=${top},left=${left}`;
}

const openPopup = (provider, url, name) => {
    return window.open(url, name, `${settings},${getPopupDimensions(provider)}`)
}

export default openPopup;