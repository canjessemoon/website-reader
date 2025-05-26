# Deployment script for Website Reader (PowerShell)

Write-Host "🚀 Starting deployment process..." -ForegroundColor Green

# Check if we're in a git repository
try {
    git rev-parse --git-dir 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Not in a git repository"
    }
} catch {
    Write-Host "❌ Error: Not in a git repository" -ForegroundColor Red
    exit 1
}

# Check if there are uncommitted changes
$status = git status --porcelain
if ($status) {
    Write-Host "⚠️  Warning: You have uncommitted changes" -ForegroundColor Yellow
    $response = Read-Host "Do you want to continue? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Host "❌ Deployment cancelled" -ForegroundColor Red
        exit 1
    }
}

# Build the application
Write-Host "🔨 Building application..." -ForegroundColor Blue
npm run build:prod

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Deploy to GitHub Pages
Write-Host "📤 Deploying to GitHub Pages..." -ForegroundColor Blue
npm run deploy

if ($LASTEXITCODE -eq 0) {
    $homepage = (npm pkg get homepage) -replace '"', ''
    Write-Host "✅ Successfully deployed to GitHub Pages!" -ForegroundColor Green
    Write-Host "🌐 Your site will be available at: $homepage" -ForegroundColor Cyan
} else {
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deployment complete!" -ForegroundColor Green
