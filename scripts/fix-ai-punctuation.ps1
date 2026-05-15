# fix-ai-punctuation.ps1 (v2)
# Replaces AI-telltale em dashes with professional documentation punctuation.
# Context-aware: applies different replacements based on surrounding syntax.
# v2: Removed paired em dash regex that broke cross-reference lines.

$files = Get-ChildItem -Path "docs","products","src" -Recurse -Include "*.mdx","*.tsx" -ErrorAction SilentlyContinue
$emd = [string][char]0x2014
$totalBefore = 0
$totalAfter = 0
$filesUpdated = 0

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $original = $content

    $beforeCount = ([regex]::Matches($content, $emd)).Count
    if ($beforeCount -eq 0) { continue }
    $totalBefore += $beforeCount

    # ================================================================
    # GROUP 1: STRUCTURAL PATTERNS -> COLON
    # ================================================================

    # 1a. Unordered list with bold: - **bold** em desc
    $content = [regex]::Replace($content, "(?m)(^\s*[-*]\s+\*\*[^*]+?\*\*)\s*$emd\s+", '$1: ')

    # 1b. Ordered list with bold: 1. **bold** em desc
    $content = [regex]::Replace($content, "(?m)(^\s*\d+\.\s+\*\*[^*]+?\*\*)\s*$emd\s+", '$1: ')

    # 1c. List with link: - [text](url) em desc
    $content = [regex]::Replace($content, "(?m)(^\s*[-*]\s+\[[^\]]+?\]\([^)]+?\))\s*$emd\s+", '$1: ')

    # 1d. Blockquote bold label: > **Label** em text (skip if colon already present)
    $content = [regex]::Replace($content, "(?m)(^>\s*\*\*[^*:]+?\*\*)\s*$emd\s+", '$1: ')

    # 1e. Badge labels: emoji + **LABEL** em desc (e.g. book emoji **REFERENCE** em ...)
    $content = [regex]::Replace($content, "(?m)^(.{1,4}\s+\*\*[A-Z][^*]+?\*\*)\s*$emd\s+", '$1: ')

    # 1f. Bold text at line start followed by em dash (standalone label)
    $content = [regex]::Replace($content, "(?m)^(\*\*[^*]+?\*\*)\s*$emd\s+", '$1: ')

    # 1g. Headings: ### TEXT em Description
    $content = [regex]::Replace($content, "(?m)(^#{1,6}\s+.+?)\s*$emd\s+", '$1: ')

    # 1h. YAML frontmatter title and description
    $content = [regex]::Replace($content, "(?m)^(title:\s*.+?)\s*$emd\s+", '$1: ')
    $content = [regex]::Replace($content, "(?m)^(description:\s*.+?)\s*$emd\s+", '$1: ')

    # 1i. Table N/A: | em |
    $content = [regex]::Replace($content, "\|\s*$emd\s*\|", '| N/A |')

    # 1j. Bold labels with em dash inside bold markers: **label em desc** -> **label: desc**
    $content = [regex]::Replace($content, "\*\*([^*\n]+?)\s*$emd\s+([^*\n]+?)\*\*", '**$1: $2**')

    # 1k. Italic labels with em dash inside: *text em text* -> *text: text*
    $content = [regex]::Replace($content, "(?<!\*)\*([^*\n]+?)\s*$emd\s+([^*\n]+?)\*(?!\*)", '*$1: $2*')

    # 1l. Section references: Section X.Y em Title
    $content = [regex]::Replace($content, "(Section\s+\d+\.?\d*)\s*$emd\s+", '$1: ')

    # ================================================================
    # GROUP 2: CONNECTIVE PATTERNS -> COMMA
    # ================================================================
    $commaWords = @(
        'and','but','or','which','where','even','provided','including',
        'whether','so','since','while','rather','meaning','typically',
        'especially','particularly','specifically','generally',
        'essentially','effectively','ultimately','consequently',
        'therefore','although','though','regardless','otherwise',
        'making','creating','causing','allowing','enabling',
        'ensuring','preventing','reducing','providing','requiring',
        'producing','generating','leaving','maintaining','using',
        'giving','accepting','containing','supporting','handling',
        'running','processing','storing','publishing','subscribing',
        'connecting','configuring','returning','delivering','carrying',
        'controlling','monitoring','managing','streaming','routing',
        'filtering','validating','triggering','affecting','exceeding',
        'delaying','adding','removing','updating','changing','replacing',
        'breaking','losing','missing','failing','blocking','rejecting',
        'potentially','possibly','presumably','apparently','arguably',
        'necessarily','optionally','alternatively','conversely','similarly',
        'accordingly','ideally','notably','importantly','critically',
        'simply','only','just','also','both','either','neither',
        'perhaps','likely','usually','often','sometimes','always',
        'never','still','yet','hence','thus','as','if','once',
        'after','before','until','unless','below','above','under',
        'every','each','any','some','no','not','all',
        'from','with','without','between','across','through','within',
        'into','onto','toward','towards','against','beyond','inside',
        'outside','beneath','alongside','upon','among','amongst',
        'during','per','via','plus','minus','versus','like'
    )
    foreach ($w in $commaWords) {
        $content = [regex]::Replace($content, "\s*$emd\s+(?=$w\s)", ', ')
    }

    # No-comma subordinators
    $noCommaWords = @('because','when')
    foreach ($w in $noCommaWords) {
        $content = [regex]::Replace($content, "\s*$emd\s+(?=$w\s)", ' ')
    }

    # ================================================================
    # GROUP 3: REMAINING EM DASHES -> SEMICOLONS
    # Semicolons are the professional standard for connecting related
    # independent clauses without the "chatty" feel of em dashes.
    # ================================================================

    # Before digit (e.g. "reference; 28 endpoints") -> colon
    $content = [regex]::Replace($content, "\s*$emd\s+(\d)", ': $1')

    # All remaining -> semicolons (safe universal replacement)
    $content = [regex]::Replace($content, "\s*$emd\s+", '; ')

    # Catch any em dash without surrounding spaces (safety net)
    $content = $content -replace $emd, '; '

    # ================================================================
    # GROUP 4: UNICODE ELLIPSIS -> THREE PERIODS
    # ================================================================
    $content = $content -replace ([string][char]0x2026), '...'

    # ================================================================
    # SAVE
    # ================================================================
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        $afterCount = ([regex]::Matches($content, $emd)).Count
        $totalAfter += $afterCount
        $replaced = $beforeCount - $afterCount
        $filesUpdated++
        $rel = $file.FullName.Replace("$((Get-Location).Path)\", '')
        Write-Host "$replaced replaced in $rel"
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Files updated: $filesUpdated"
Write-Host "Em dashes before: $totalBefore"
Write-Host "Em dashes after: $totalAfter"
Write-Host "Total replaced: $($totalBefore - $totalAfter)"
