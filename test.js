process.stdin.resume();

process.stdin.setEncoding('utf8');

let json = '';

process.stdin.on('data', function(chunk) {
    data += chunk;

    // Check if data ends with two newline characters
    while (data.endsWith('\n\n')) {
        // Remove trailing newlines
        json = json.slice(0, -2);

        try {
            const jsonData = JSON.parse(json);
            console.log('Received JSON data:', jsonData);
            // Now you can work with jsonData as a JavaScript object
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }

        // Clear data for next JSON object
        data = '';
    }
});


process.on('SIGINT', function() {
    process.exit(0);
});

process.on('SIGTERM', function() {
    process.exit(0);
});