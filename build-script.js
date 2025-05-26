const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Building Website Reader with compatibility fixes...');

// Set environment variables
process.env.NODE_OPTIONS = '--openssl-legacy-provider';
process.env.GENERATE_SOURCEMAP = 'false';

try {
  // Run the build
  execSync('react-scripts build', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      NODE_OPTIONS: '--openssl-legacy-provider'
    }
  });
  
  console.log('✅ Build completed successfully!');
  
  // Verify build directory exists
  if (fs.existsSync(path.join(__dirname, 'build'))) {
    console.log('✅ Build directory created');
  } else {
    console.log('❌ Build directory not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
