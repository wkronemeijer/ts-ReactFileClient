$here = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Push-Location "$here\src"
    #############
    ### BEGIN ###
    #############
    
    $extension = ".tsx";
    $target = "Pages.generated.tsx"
    
    $modules = @(
        Get-ChildItem -Filter "*.page$extension" -Recurse -File |
        Select -Expand FullName |
        Resolve-Path -Relative -LiteralPath {$_} | # Fixes [] problems
        ForEach-Object { $_.Substring(0, $_.Length - $extension.Length) } |
        ForEach-Object { $_.Replace("\", "/") } |
        ForEach-Object { "import `"" + $_ + "`";" }
    )
    
    $newline = "`n"
    $output = [string]::Join("`n", @(
        "// [Update-Pages.ps1] Generated on $(Get-Date).",
        # "// `"Toggle comment to improve development.`"() /*",
        [string]::Join("`n", $modules),
        "//*/"
    ))
    
    Out-File -FilePath $target -InputObject $output -Encoding UTF8
    
    ###########
    ### END ###
    ###########
Pop-Location
