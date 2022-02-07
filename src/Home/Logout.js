export default function Logout(props) {
    let logoutClicked = props.logoutClicked;
    return (
        <div className="nav">
            <div onClick={logoutClicked} className="logout-btn">
                SIGN OUT
            </div>
        </div>
    );
}
