# googlesheet-assignment

# Google Sheets API Data Fetcher

A Node.js/Express application that fetches data from Google Sheets and serves it via a REST API endpoint.

## Features

- Fetches data from Google Sheets using Google Sheets API v4
- Serves data via a REST API endpoint
- Supports optional header-based JSON formatting
- Error handling for missing sheets or invalid ranges
- Secure authentication using Google Service Account

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher) installed on your system
- **npm** (Node Package Manager) - comes with Node.js
- A **Google Cloud Platform** account
- A **Google Sheets** spreadsheet you want to access

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd my-node-project
