process.stdin.resume();
process.stdin.setEncoding('utf8');

let json = '';

process.stdin.on('data', function(chunk) {
    json += chunk;

    while (json.endsWith('\n')) {
        json = json.slice(0, -2);

        try {
            const jsonData = JSON.parse(json);
            console.log('Received JSON data:', jsonData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }

        json = '';
    }
});

process.on('SIGINT', function() {
    process.exit(0);
});

process.on('SIGTERM', function() {
    process.exit(0);
});