const todayDay = new Date();

exports.getDate = function() {
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }
    return todayDay.toLocaleDateString('en-US', options);
}

exports.getDay = function() {
    const options = {
        weekday: 'long'
    }
    return todayDay.toLocaleDateString('en-US', options);

}