const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

// Cloudinary configuration (from your .env.local)
const cloudName = 'dd431rll2';
const apiKey = '797471237134399';
const apiSecret = 'tZT-3MGt9Ck1wOg6h-meB7le3nY';

async function uploadToCloudinary(imagePath, publicId) {
    const imageData = fs.readFileSync(imagePath, 'base64');
    const base64Image = `data:image/jpeg;base64,${imageData}`;

    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'power-couple-slideshow';

    // Create signature
    const stringToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

    const formData = JSON.stringify({
        file: base64Image,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
        folder: folder,
        public_id: publicId
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.cloudinary.com',
            path: `/v1_1/${cloudName}/image/upload`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(formData)
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const result = JSON.parse(data);
                    resolve(result.secure_url);
                } else {
                    reject(new Error(`Upload failed: ${data}`));
                }
            });
        });

        req.on('error', reject);
        req.write(formData);
        req.end();
    });
}

async function main() {
    const image1Path = 'C:/Users/Dell/.gemini/antigravity/brain/853f5793-7290-4e09-99fa-d47ae97bf0ef/uploaded_image_0_1768751430908.jpg';
    const image2Path = 'C:/Users/Dell/.gemini/antigravity/brain/853f5793-7290-4e09-99fa-d47ae97bf0ef/uploaded_image_1_1768751430908.jpg';

    console.log('Uploading childhood photo 1...');
    const url1 = await uploadToCloudinary(image1Path, 'childhood-1');
    console.log('✅ Image 1 uploaded:', url1);

    console.log('\nUploading childhood photo 2...');
    const url2 = await uploadToCloudinary(image2Path, 'childhood-2');
    console.log('✅ Image 2 uploaded:', url2);

    console.log('\n🎉 Both images uploaded successfully!');
    console.log('\nAdd these URLs to your slideshow:');
    console.log('1:', url1);
    console.log('2:', url2);
}

main().catch(console.error);
