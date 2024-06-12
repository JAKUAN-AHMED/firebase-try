import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";

const Root = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;