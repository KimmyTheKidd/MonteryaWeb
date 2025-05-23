const { execSync } = require('child_process');

try {
  const output = execSync('npx prettier --check .').toString();
  const lines = output.split('\n');
  
  lines.forEach(line => {
    if (line.includes('Error')) {
      console.error(line);
    }
  });
  
  process.exit(0); // Exit with 0 to indicate success
} catch (error) {
  console.error('Prettier found issues:');
  console.error(error.stdout.toString());
  process.exit(1); // Exit with 1 to indicate failure
}
