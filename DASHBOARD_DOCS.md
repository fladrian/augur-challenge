# Threat Intelligence Dashboard Documentation

This dashboard provides a centralized interface for monitoring and analyzing Threat Intelligence indicators (IoCs). It features real-time data visualization, advanced filtering, and detailed indicator management.

## 📊 Main Features

### Threat Overview
Located at the top, this section provides an immediate snapshot of the active threats:
- **Total Indicators**: A counter showing the total number of processed threats.
- **Threat Distribution**: An interactive pie chart that breaks down threats by severity percentages.
- **Severity Breakdown**: A grid view showing exact counts for Critical, High, Medium, and Low severity threats.

### Indicator Management
The main table displays detailed information for each security indicator:
- **Indicator**: The core value (IP address, Domain, File Hash, or URL).
- **Type**: Categorization of the indicator with helpful icons.
- **Severity**: A color-coded badge indicating the danger level.
- **Confidence**: A percentage representinc how reliable the threat information is.
- **Source**: The intelligence provider that reported the threat (e.g., VirusTotal, AbuseIPDB).
- **Tags**: Metadata labels providing context (e.g., "tor-exit", "ransomware").
- **Last Seen**: A relative timestamp showing how recently the threat was active.

---

## 🔍 Search and Filtering

The dashboard includes a powerful filtering toolbar to help analysts focus on specific threats:

### 1. Global Search
- **Function**: Search in real-time across multiple fields.
- **Targets**: Indicator values, source names, and individual tags.
- **Behavior**: It uses a "debounce" mechanism (300ms) to ensure smooth performance while typing.

### 2. Severity Filter
- **Options**: All, Critical, High, Medium, Low.
- **Use case**: Prioritize urgent threats or filter out low-noise alerts.

### 3. Indicator Type Filter
- **Options**: All, IP Address, Domain, File Hash, URL.
- **Use case**: Focus investigations on specific vector types (network, web, or file-based).

### 4. Intel Source Filter
- **Options**: All Sources + 16 specific providers.
- **Use case**: Filter indicators coming from a preferred or specific intelligence feed.

### 5. Reset Action
- **Clear Filters**: Resets all dropdowns and search inputs to their default "All" state in a single click.

---

## 🛠 Technical Details
- **Seeded Data**: For consistency across sessions and deployments (Netlify), the data is generated using a fixed seed, ensuring IDs and values remain stable.
- **Performance**: The table supports sorting by any column and handles large datasets efficiently.
- **Responsive Design**: The interface adapts to different screen sizes while maintaining readability.
