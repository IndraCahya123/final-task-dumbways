function TopPage(props) {
    return (
        <div style={{
            backgroundColor: "#fff",
            width: "100%",
            height: "64px",
            padding: "0 70px",
            display: "flex",
            alignItems: "center"
        }}>
            <h4>{ props.menu }</h4>
        </div>
    )
}

export default TopPage
