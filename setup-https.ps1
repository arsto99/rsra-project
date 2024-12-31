# Ensure running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "Please run this script as Administrator!"
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

try {
    # Create certs directory if it doesn't exist
    $certsPath = Join-Path $PSScriptRoot "certs"
    if (-not (Test-Path $certsPath)) {
        New-Item -ItemType Directory -Path $certsPath | Out-Null
    }

    # Generate self-signed certificate
    $cert = New-SelfSignedCertificate `
        -DnsName "localhost" `
        -CertStoreLocation "cert:\LocalMachine\My" `
        -NotAfter (Get-Date).AddYears(1) `
        -KeyAlgorithm RSA `
        -KeyLength 2048 `
        -KeyExportPolicy Exportable `
        -KeyUsage DigitalSignature, KeyEncipherment `
        -FriendlyName "RSAR Development Certificate"

    # Export certificate with private key
    $pwd = ConvertTo-SecureString -String "rsar-dev-cert" -Force -AsPlainText
    $certPath = Join-Path $certsPath "localhost.pfx"
    Export-PfxCertificate -Cert $cert -FilePath $certPath -Password $pwd | Out-Null
    
    # Export public key
    $certPublicPath = Join-Path $certsPath "cert.pem"
    $certPrivatePath = Join-Path $certsPath "key.pem"
    
    # Convert PFX to PEM using OpenSSL
    $opensslCmd = "openssl pkcs12 -in `"$certPath`" -clcerts -nokeys -out `"$certPublicPath`" -passin pass:rsar-dev-cert"
    $opensslCmd2 = "openssl pkcs12 -in `"$certPath`" -nocerts -nodes -out `"$certPrivatePath`" -passin pass:rsar-dev-cert"
    
    # Try to execute OpenSSL commands
    try {
        Invoke-Expression "openssl version"
        Invoke-Expression $opensslCmd
        Invoke-Expression $opensslCmd2
    } catch {
        Write-Warning "OpenSSL not found. Using certificate in PFX format only."
    }

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
    
    Write-Host "`nCertificate files created:"
    Write-Host "PFX: $certPath"
    if (Test-Path $certPublicPath) {
        Write-Host "Public Key (PEM): $certPublicPath"
        Write-Host "Private Key (PEM): $certPrivatePath"
    }
    
    Write-Host "`nYou can now access https://localhost:5173 and https://localhost:2003 without warnings."
} catch {
    Write-Error "An error occurred: $_"
} finally {
    Write-Host "`nPress any key to continue..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}
