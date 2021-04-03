function FileButtonLink(props) {
    const link = (e) => {
        props.onChangeLink(e);
        props.previewLink(e);
    }
    
    return (
        <div>
            <input type="file" id="actual-btn1" name="imageLink" onChange={e => {
                link(e)
            }} hidden />
            <label id="file-button" for="actual-btn1">
                Upload Image
            </label>
        </div>
    );
    
}

export default FileButtonLink
