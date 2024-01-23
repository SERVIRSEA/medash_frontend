/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // Set the maximum size for images in kilobytes (KB)
        // Default value is 10240 KB (10 MB)
        maxSize: 102400, // Set it according to your requirements
    },
}

module.exports = nextConfig
