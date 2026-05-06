function myOwnSetTimeout(duration, message) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, duration);
    });
}

// Run both timers in parallel
Promise.all([
    myOwnSetTimeout(1000, 'log the first thing'),
    myOwnSetTimeout(2000, 'log the second thing'),
]).then(() => {
    console.log('Both are done!');
});
