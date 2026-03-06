# Threat Intelligence Dashboard Documentation

This dashboard is a high-performance, real-time interface for monitoring Threat Intelligence indicators (IoCs). It combines advanced data visualization with optimized filtering to provide security analysts with immediate, actionable insights.

## 📊 Visual Data Representation

### Enhanced Analytics with Charts
Instead of relying solely on raw numbers, the dashboard uses **Recharts** to provide a visual breakdown of the threat landscape:
- **Interactive Pie Chart**: Visualizes the distribution of threats by severity levels (Critical, High, Medium, Low), allowing for instant identification of the current threat profile.
- **Dynamic Legends**: Connected to the chart data, providing exact counts and percentage shares for each severity category.
- **Improved Scannability**: The use of visual aids makes it significantly easier for users to identify anomalies or sudden spikes in specific threat types compared to a text-only interface.

## 🔍 Optimized Search and Filtering

### High-Performance Search (useDebounce)
The global search feature is optimized for "request quality" and system performance:
- **API Optimization**: By using the `useDebounce` hook, the dashboard waits for 300ms of inactivity before triggering a new search request.
- **Reduced Load**: This prevents the system from firing an API call for every keystroke, which significantly reduces unnecessary server load and improves the overall responsiveness of the UI.
- **Better UX**: Users can type complex search terms without experiencing the "stutter" that often comes from constant re-filtering of large datasets.

### Multi-Layered Filtering
Analysts can combine multiple filters to narrow down the data:
- **Severity**: Direct filtering by threat level.
- **Indicator Type**: Focus on IPs, Domains, File Hashes, or URLs.
- **Intel Source**: Filter by specific providers like VirusTotal, Shodan, or AbuseIPDB.
- **Quick Reset**: A single-click "Clear filters" action to return to the global view instantly.

## 🛠 Indicator Detail Management

The central table provides deep insights into each IoC:
- **Indicator Value**: Displayed in a monospace font for technical accuracy.
- **Confidence Scores**: Visual progress bars representing the reliability criteria of the threat.
- **Tags & Metadata**: Contextual labels like "tor-exit" or "ransomware" for quick categorization.
- **Temporal Insight**: "Last Seen" timestamps show the currency of the threat information.

## � Production & Reliability (Netlify)
- **Deterministic Data**: Uses a seeded random generator in the backend to ensure stable IDs (`indicators/:id`) across serverless restarts on platforms like Netlify.
- **Robust Routing**: The Express backend is configured to handle both `/api` and root-level routes, ensuring compatibility with various deployment environments.
