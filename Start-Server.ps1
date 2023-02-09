$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent

node $scriptDir\server\index.mjs
