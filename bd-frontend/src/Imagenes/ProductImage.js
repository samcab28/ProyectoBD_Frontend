// src/components/ProductImage.js
import React from 'react';
import '../Styles/PageContainer.css';

const getDriveImageUrl = (url) => {
    console.log('Original URL:', url);
    if (typeof url === 'string' && url.includes('drive.google.com')) {
        const match = url.match(/[-\w]{25,}/);
        if (match) {
            const imageUrl = `https://drive.google.com/uc?export=view&id=${match[0]}`;
            console.log(`Extracted Google Drive ID: ${match[0]}`);
            console.log(`Generated Image URL: ${imageUrl}`);
            return imageUrl;
        }
    }
    return '';
};

const ProductImage = ({ url, alt }) => {
    return (
        <div className="product-image-container">
            {typeof url === 'string' && url.includes('drive.google.com') ? (
                <img src={getDriveImageUrl(url)} alt={alt} className="product-image" />
            ) : (
                <p>Imagen no disponible</p>
            )}
        </div>
    );
};

export default ProductImage;