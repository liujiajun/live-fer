export default function getFixedSizeArray(length) {
    var array = [];

    array.push = function () {
        if (this.length >= length) {
            this.shift();
        }
        return Array.prototype.push.apply(this,arguments);
    };

    return array;

}
