import Needle from "../interfaces/Needle"

const InArray = (needle: Needle, haystack: string[]) => {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] === needle) return true;
    }
    return false;
}

export default InArray