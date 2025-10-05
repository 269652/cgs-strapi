const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

const UPLOAD_DIR = path.join(__dirname, 'public', 'uploads');
const STRAPI_URL = 'https://cgs-strapi-production.up.railway.app';
const TOKEN = '47ee77675b804a423d6965130730a1adf653ea2cb7f9d73936544dc1a4e0973d7d35244f74654e0f3ec8f3eb95f700763edf1030402dd58d146387d6bc237ed5774f16827801ffd8ad7209ca67654835b4be23bc21aa1f529b55c115513acc0cee10b0b203147ef37b991fdddd35f03063b3557d1c75917bd5c6c4426f218b7e';

axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

// 1. Delete all assets
async function deleteAllAssets() {
  try {
    const res = await axios.get(`${STRAPI_URL}/api/upload/files?pagination[pageSize]=1000`);
    const files = res.data || [];
    for (const file of files) {
      try {
        await axios.delete(`${STRAPI_URL}/api/upload/files/${file.id}`);
        console.log(`Deleted: ${file.name}`);
      } catch (err) {
        console.error(`Failed to delete ${file.name}:`, err.response?.data || err.message);
      }
    }
  } catch (err) {
    console.error('Failed to fetch assets:', err.response?.data || err.message);
  }
}

// 2. Re-upload all files
async function uploadAllFiles() {
  const fileMap = {};
  const files = fs.readdirSync(UPLOAD_DIR);
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  for (const file of files) {
    if (file.startsWith('.')) continue;
    const ext = path.extname(file).toLowerCase();
    if (!allowedExtensions.includes(ext)) continue;
    const filePath = path.join(UPLOAD_DIR, file);
    let stat;
    try {
      stat = fs.statSync(filePath);
    } catch (err) {
      console.error(`Failed to stat ${file}:`, err.message);
      continue;
    }
    if (!stat.isFile() || stat.size === 0) continue;
    console.log('Uploading:', filePath);
    const form = new FormData();
    form.append('files', fs.createReadStream(filePath));
    try {
      const res = await axios.post(`${STRAPI_URL}/api/upload`, form, {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${TOKEN}`,
        }
      });
      const uploaded = res.data[0];
      fileMap[file] = uploaded.id;
      console.log(`Uploaded: ${file} (id: ${uploaded.id})`);
    } catch (err) {
      console.error(`Failed to upload ${file}:`, err.response?.data || err.message);
    }
  }
  return fileMap;
}

// 3. Update all image references in content and components
async function updateImageReferences(fileMap) {
  try {
    // Get all content types
    const contentTypesRes = await axios.get(`${STRAPI_URL}/api/content-type-builder/content-types`);
    const contentTypes = contentTypesRes.data.data;
    for (const ct of contentTypes) {
      const apiId = ct.uid;
      // Only update collection types
      if (!apiId.startsWith('api::')) continue;
      // Get plural name from apiId (e.g., api::page.page -> pages)
      const parts = apiId.split('::')[1].split('.');
      let apiName = parts[0];
      // Pluralize basic types (simple heuristic)
      if (!apiName.endsWith('s')) apiName += 's';
  // Skip known non-collection types
  if (["component", "components", "group", "section"].includes(apiName)) continue;
      let entriesRes;
      try {
        entriesRes = await axios.get(`${STRAPI_URL}/api/${apiName}?pagination[pageSize]=1000`);
      } catch (err) {
        console.error(`Failed to fetch entries for ${apiName}:`, err.response?.data || err.message);
        continue;
      }
      const entries = entriesRes.data.data;
      for (const entry of entries) {
        let updated = false;
        // Recursively update image fields
        function updateImages(obj) {
          if (Array.isArray(obj)) {
            obj.forEach(updateImages);
          } else if (obj && typeof obj === 'object') {
            for (const key in obj) {
              if (key === 'name' && fileMap[obj[key]]) {
                obj.id = fileMap[obj[key]];
                updated = true;
              } else {
                updateImages(obj[key]);
              }
            }
          }
        }
        updateImages(entry);
        if (updated) {
          try {
            await axios.put(`${STRAPI_URL}/api/${apiName}/${entry.id}`, entry);
            console.log(`Updated entry ${entry.id} in ${apiId}`);
          } catch (err) {
            console.error(`Failed to update entry ${entry.id} in ${apiId}:`, err.response?.data || err.message);
          }
        }
      }
    }
  } catch (err) {
    console.error('Failed to update image references:', err.response?.data || err.message);
  }
}

(async () => {
  await deleteAllAssets();
  const fileMap = await uploadAllFiles();
  await updateImageReferences(fileMap);
})();