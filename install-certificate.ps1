# Ensure running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Please run this script as Administrator!"
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

try {
    # Get the certificate path
    $certPath = Join-Path $PSScriptRoot "certs\cert.pem"
    
    # Import the certificate
    $cert = New-Object System.Security.Cryptography.X509Certificates.X509Certificate2($certPath)
    
    # Install to Trusted Root store
    $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("Root", "LocalMachine")
    $store.Open("ReadWrite")
    
    # Check if certificate already exists
    $existingCert = $store.Certificates.Find([System.Security.Cryptography.X509Certificates.X509FindType]::FindByThumbprint, $cert.Thumbprint, $false)
    if ($existingCert.Count -gt 0) {
        Write-Host "Certificate already exists in the Trusted Root store."
    } else {
        $store.Add($cert)
        Write-Host "Certificate has been installed successfully in the Trusted Root store."
    }
    
    $store.Close()
    
    Write-Host "`nCertificate details:"
    Write-Host "Subject: $($cert.Subject)"
    Write-Host "Thumbprint: $($cert.Thumbprint)"
    Write-Host "Valid from: $($cert.NotBefore)"
    Write-Host "Valid to: $($cert.NotAfter)"
    
    Write-Host "`nYou can now access https://localhost:5173 and https://localhost:2003 without warnings."
} catch {
    Write-Error "An error occurred: $_"
} finally {
    Write-Host "`nPress any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
