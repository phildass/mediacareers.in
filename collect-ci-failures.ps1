# Normalise $runs: accept either { workflow_runs: [...] } or an array directly.
if ($null -eq $runs) {
  Write-Error "No runs were loaded."
  exit 2
}

# If $runs is a PSCustomObject that contains a 'workflow_runs' property, use it.
if ($runs -is [System.Management.Automation.PSCustomObject] -and ($runs.PSObject.Properties.Name -contains 'workflow_runs')) {
  $runs = $runs.workflow_runs
}
# If $runs is already an array (object[]), leave it as-is.
elseif ($runs -is [System.Object[]]) {
  # already an array, do nothing
}
# If $runs is a single object representing one run, wrap it into an array.
else {
  try {
    $runs = @($runs)
  } catch {
    Write-Warning "Unable to normalize runs response; unexpected shape: $($_.Exception.Message)"
    exit 2
  }
}