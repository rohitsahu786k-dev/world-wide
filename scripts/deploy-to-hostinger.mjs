import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const token = 'yODSGWPvlYo8liAODYfw1RzKWqjhQhBDdZri0Rs53b602ba2';
const username = 'u426698508';
const domain = 'worldwidesupply28.com';
const outDir = path.resolve('out');
const zipFile = path.resolve('deploy_site.zip');

async function deploy() {
  console.log('--- 1. Packaging out/ directory into deploy_site.zip ---');
  if (fs.existsSync(zipFile)) {
    fs.unlinkSync(zipFile);
  }
  
  // Use PowerShell Compress-Archive
  execSync(`powershell -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipFile}' -Force"`, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  console.log(`Package created: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

  console.log('--- 2. Requesting Hostinger upload URL ---');
  const upRes = await fetch('https://developers.hostinger.com/api/hosting/v1/files/upload-urls', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ domain, username })
  });

  if (!upRes.ok) {
    throw new Error(`Failed to get upload URL: ${upRes.status} ${await upRes.text()}`);
  }
  const creds = await upRes.json();
  console.log('Upload credentials obtained.');

  console.log('--- 3. Uploading archive via TUS protocol ---');
  const buffer = fs.readFileSync(zipFile);
  const archiveName = 'deploy_site.zip';

  // POST create upload
  const postRes = await fetch(`${creds.url}/${archiveName}?override=true`, {
    method: 'POST',
    headers: {
      'X-Auth': creds.auth_key,
      'X-Auth-Rest': creds.rest_auth_key,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(buffer.length),
      'Upload-Offset': '0'
    }
  });

  if (postRes.status !== 201) {
    throw new Error(`TUS POST create failed: ${postRes.status} ${await postRes.text()}`);
  }

  // PATCH upload bytes
  const patchRes = await fetch(`${creds.url}/${archiveName}?override=true`, {
    method: 'PATCH',
    headers: {
      'X-Auth': creds.auth_key,
      'X-Auth-Rest': creds.rest_auth_key,
      'Tus-Resumable': '1.0.0',
      'Content-Type': 'application/offset+octet-stream',
      'Upload-Offset': '0'
    },
    body: buffer
  });

  if (patchRes.status !== 204) {
    throw new Error(`TUS PATCH upload failed: ${patchRes.status} ${await patchRes.text()}`);
  }
  console.log('Archive upload completed successfully.');

  console.log('--- 4. Triggering Hostinger deploy ---');
  const depRes = await fetch(`https://developers.hostinger.com/api/hosting/v1/accounts/${username}/websites/${domain}/deploy`, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ archive_path: archiveName })
  });

  const depText = await depRes.text();
  console.log(`Deploy response (${depRes.status}):`, depText);

  if (!depRes.ok) {
    throw new Error(`Deploy failed: ${depRes.status} ${depText}`);
  }

  console.log('SUCCESS: Frontend deployed to Hostinger!');
}

deploy().catch((err) => {
  console.error('Deployment error:', err);
  process.exit(1);
});
