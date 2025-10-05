const fs = require('fs');
const path = require('path');
const axios = require('axios');

const STRAPI_URL = 'https://cgs-strapi-production.up.railway.app';
const TOKEN = '47ee77675b804a423d6965130730a1adf653ea2cb7f9d73936544dc1a4e0973d7d35244f74654e0f3ec8f3eb95f700763edf1030402dd58d146387d6bc237ed5774f16827801ffd8ad7209ca67654835b4be23bc21aa1f529b55c115513acc0cee10b0b203147ef37b991fdddd35f03063b3557d1c75917bd5c6c4426f218b7e';
const LOCAL_UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

// Ensure the uploads directory exists
if (!fs.existsSync(LOCAL_UPLOADS_DIR)) {
  fs.mkdirSync(LOCAL_UPLOADS_DIR, { recursive: true });
}

async function downloadAsset(file) {
  try {
    const fileUrl = `${STRAPI_URL}${file.url}`;
    // Extract filename from URL path (e.g., /uploads/klassenzimmer_07395e6c4d.jpg)
    const urlFileName = path.basename(file.url);
    const localFilePath = path.join(LOCAL_UPLOADS_DIR, urlFileName);
    
    // Skip if file already exists
    if (fs.existsSync(localFilePath)) {
      console.log(`Skipping existing file: ${urlFileName}`);
      return;
    }
    
    console.log(`Downloading: ${urlFileName} from ${file.url}`);
    
    const response = await axios.get(fileUrl, {
      responseType: 'stream'
    });
    
    const writer = fs.createWriteStream(localFilePath);
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Downloaded: ${urlFileName}`);
        resolve();
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Failed to download ${file.url}:`, error.message);
  }
}

async function downloadAllAssets() {
  try {
    console.log('Fetching asset list from Strapi...');
    const response = await axios.get(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=1000`);
    const files = response.data || [];
    
    console.log(`Found ${files.length} assets to download`);
    
    for (const file of files) {
      await downloadAsset(file);
    }
    
    console.log('All assets downloaded successfully!');
  } catch (error) {
    console.error('Failed to fetch assets:', error.response?.data || error.message);
  }
}

downloadAllAssets();