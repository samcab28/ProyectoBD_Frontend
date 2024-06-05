import React from 'react';

const ProductImage = ({ url, alt }) => {
    // Asegúrate de que la URL es válida para Google Drive
    const getDirectImageUrl = (driveUrl) => {
        const match = driveUrl.match(/\/d\/(.*)\//);
        if (match && match[1]) {
            return `https://drive.google.com/uc?export=view&id=${match[1]}`;
        }
        return null;
    };

    const directImageUrl = getDirectImageUrl(url);

    console.log('Original URL:', url);
    console.log('Transformed URL:', directImageUrl);

    return (
        <img 
            src={directImageUrl || 'https://via.placeholder.com/150'} 
            alt={alt} 
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} 
            style={{ width: '150px', height: '150px' }} // Ajusta el tamaño de la imagen según sea necesario
        />
    );
};

export default ProductImage;
