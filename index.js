process.stdin.resume();

process.stdin.setEncoding('utf8');

let json = '';

process.stdin.on('readable', () => {
    let chunk;
    // Use a loop to make sure we read all available data.
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Received data: ${chunk.trim()}`);
        json += chunk;
    }
  });
  
  process.stdin.on('end', () => {
    process.exit();
    console.log(json);
  });


process.on('SIGINT', function() {
    process.exit(0);
});

process.on('SIGTERM', function() {
    process.exit(0);
});