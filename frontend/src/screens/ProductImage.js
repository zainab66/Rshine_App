import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';
import { generatePublicUrl } from '../urlConfig';

export default function ProductImage(props) {
    const [Images, setImages] = useState([])
    useEffect(() => {
        if (props.detail.productPictures && props.detail.productPictures.length > 0) {
            let images = [];
            props.detail.productPictures && props.detail.productPictures.map(item => {
                images.push({
                    original: generatePublicUrl(item.img),
                    thumbnail: generatePublicUrl(item.img)
                })
            })
            setImages(images)
        }
    }, [props.detail])

    return (
        <div className="slider">
            <ImageGallery thumbnailPosition="left"  items={Images} />
        </div>
    )
}
