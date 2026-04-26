# v-rust-tunnel 🚀

A high-performance Rust-based XHTTP/V2Ray relay specifically optimized for Vercel Edge. 
Designed for low-latency tunneling from restricted regions to backend Xray servers.

## Features
- **Rust Runtime:** Compiled machine code for zero-latency header processing.
- **Memory Efficient:** Uses `Body::from_stream` to pipe data without buffering (perfect for large VPN packets).

## Setup & Deployment

### 1. Requirements
- Vercel CLI (`npm i -g vercel`)
- A Vercel Pro Account (recommended for higher bandwidth/concurrency)

### 2. Environment Variables
In your Vercel Dashboard, add the following:
- `TARGET_DOMAIN`: Your backend server URL (e.g., `http://docker.io`)

### 3. Deploy
```bash
# Clone and enter
git clone <your-repo-url>
cd v-rust-tunnel

# Deploy to Vercel
vercel --prod