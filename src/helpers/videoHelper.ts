const blobToURL = (vid: Blob) => {
    return window.URL.createObjectURL(vid);
}

export default blobToURL;