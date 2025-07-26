


const convertBytesToMb = (bytes) => {
    return bytes / 1048576
}

const convertBytesToGb = (bytes) => {
    return bytes / 1073741824
}

const convertSecToMinute = (second) => {
    return second / 60
}

module.exports = {
    convertBytesToMb, convertBytesToGb, convertSecToMinute
}