# Check if nodemon is already running
$nodemonProcess = Get-Process -Name nodemon -ErrorAction SilentlyContinue

if ($nodemonProcess -eq $null) {
    # If nodemon is not running, start the server
    nodemon server.js
} else {
    Write-Host "nodemon is already running"
}

# Start the server with app.listen() if nodemon is not running
if ($nodemonProcess -eq $null) {
    node server.js
}
