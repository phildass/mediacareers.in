# diagnostics for runs.json - run with: powershell.exe -ExecutionPolicy Bypass -File .\diagnostics.ps1
Remove-Variable s,runs -ErrorAction SilentlyContinue
$s = Get-Content .\runs.json -Raw
Write-Host "1) raw length: $($s.Length)"
Write-Host "2) start (first 300 chars):"
Write-Host $($s.Substring(0,[math]::Min(300,$s.Length)))
Write-Host "`n3) end (last 300 chars):"
Write-Host $($s.Substring([math]::Max(0,$s.Length-300),[math]::Min(300,$s.Length)))
try {
  $runs = ConvertFrom-Json -InputObject $s
  Write-Host "`nPARSE OK"
} catch {
  Write-Host "`nPARSE ERROR: $($_.Exception.Message)"
  exit 2
}
if ($null -eq $runs) {
  Write-Host "`$runs is $null"
} else {
  Write-Host "`$runs type = $($runs.GetType().FullName); Count = $($runs.Count)"
  if ($runs -is [System.Array]) { Write-Host "first run id = $($runs[0].id)" } else { Write-Host "single object id = $($runs.id)" }
}