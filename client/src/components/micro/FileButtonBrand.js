function FileButtonBrand(props) {
    const brand = (e) => {
        props.onChangeBrand(e);
        props.previewBrand(e);
    }
    
    return (
        <div>
            <input type="file" id="actual-btn" name="imageBrand" onChange={e => {
                brand(e)
            }} hidden />
            <label id="file-button" for="actual-btn">
                Upload Image
            </label>
        </div>
    );
    
}

export default FileButtonBrand
