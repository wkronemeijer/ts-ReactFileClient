$here = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent


$sourceFile = "$here\SetList.txt"
$targetDir = "$here\ImageCache"
$setNumbers = New-Object System.Collections.Generic.List[System.Object]
$forReal = $true

foreach($line in Get-Content $sourceFile) {
    if ($line -Match "^\d{4,7}") {
        $setNumbers.Add($Matches.0)
    }
}

foreach($setNumber in $setNumbers) {
    $url = "https://images.brickset.com/sets/images/${setNumber}-1.jpg"
    $targetFile = "$targetDir\$setNumber.jpg"
    
    if ([System.IO.File]::Exists($targetFile)) {
        continue
    }
    
    Write-Host "Downloading set #$setNumber..."
    
    if ($forReal) {
        irm $url -OutFile $targetFile
        # Start-Sleep -Seconds 1
    } else {
        Write-Host "irm $url -OutFile $targetFile"
    }
}
