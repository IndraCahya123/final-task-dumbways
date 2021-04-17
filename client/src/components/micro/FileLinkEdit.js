import { useEffect, useState } from 'react';

import DefaultImage from '../../images/defaultImg.png';

function FileLinkEdit(props) {
    const [imgLinkPreview, setImageLinkPreview] = useState({
        preview: "",
    });

    useEffect(() => {
        if (props.image == "http://localhost:5000/uploadedImages/null") {
            setImageLinkPreview({
                preview: DefaultImage
            });
        } else {
            setImageLinkPreview({
                preview: props.image
            })
        }
    },[])

    const onChangeImgBrandPreview = (e) => {
        const file = e.target.files[0]

        setImageLinkPreview({
            preview: URL.createObjectURL(file),
        })
    }

    return (
        <>
            <label id={"file-button-" + props.index} for={"actual-btn-" + props.index}>
                <img
                    src={imgLinkPreview.preview}
                    alt="preview"
                    width="70px"
                    height="70px"
                />
                <input type="file" id={"actual-btn-" + props.index} name="image" data-index={props.index} onChange={e => {
                    props.onChange(e);
                    onChangeImgBrandPreview(e);
                }} hidden />
            </label>
        </>
    )
}

export default FileLinkEdit
