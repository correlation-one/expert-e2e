const fs = require('fs');

// Function to parse JSON and count passed and failed tests
function parseJSON(jsonData) {
    const tests = JSON.parse(jsonData).children;
    let passed = 0;
    let failed = 0;

    tests.forEach(test => {
        if (test.status === 'passed') {
            passed++;
        } else if (test.status === 'failed' || test.status === 'broken') {
            failed++;
        }
    });

    return { passed, failed };
}

// Main function
function main(jsonFile) {
    fs.readFile(jsonFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return;
        }
        const { passed, failed } = parseJSON(data);
        console.log('Total Passed Tests:', passed);
        console.log('Total Failed Tests:', failed);
    });
}

// Usage: node script.js path/to/json_file.json
const jsonFile = process.argv[2];
if (!jsonFile) {
    console.error('Please provide path to JSON file.');
    process.exit(1);
}

main(jsonFile);
