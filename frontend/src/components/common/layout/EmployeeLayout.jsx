import EmployeeTopBar from "./EmployeeTopbar";

const EmployeeLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-background">

            <EmployeeTopBar />

            <main className="p-8">
                {children}
            </main>

        </div>
    );
};

export default EmployeeLayout;