const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Building Website Reader with compatibility fixes...');
console.log('📍 Node.js version:', process.version);
console.log('📍 Platform:', process.platform);

// Set environment variables
process.env.NODE_OPTIONS = '--openssl-legacy-provider';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.CI = 'false'; // Disable treating warnings as errors

console.log('🔧 Environment variables set:');
console.log('   NODE_OPTIONS:', process.env.NODE_OPTIONS);
console.log('   GENERATE_SOURCEMAP:', process.env.GENERATE_SOURCEMAP);
console.log('   CI:', process.env.CI);

try {
  console.log('🚀 Starting React build process...');
  
  // Run the build
  execSync('react-scripts build', { 
    stdio: 'inherit',
    env: { 
      ...process.env,
      NODE_OPTIONS: '--openssl-legacy-provider',
      GENERATE_SOURCEMAP: 'false',
      CI: 'false'
    }
  });
  
  console.log('✅ Build completed successfully!');
  
  // Verify build directory exists
  if (fs.existsSync(path.join(__dirname, 'build'))) {
    console.log('✅ Build directory created');
    
    // List some files to confirm
    const buildFiles = fs.readdirSync(path.join(__dirname, 'build'));
    console.log('📁 Build directory contains:', buildFiles.slice(0, 5).join(', '));
  } else {
    console.log('❌ Build directory not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('📍 Error details:', error);
  process.exit(1);
}
