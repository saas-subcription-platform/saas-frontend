const LeaveBalance = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700">
                    Casual Leave
                </h3>

                <p className="text-4xl font-bold text-blue-600 mt-4">
                    8
                </p>

                <p className="text-gray-500 mt-2">
                    Days Remaining
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700">
                    Sick Leave
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-4">
                    5
                </p>

                <p className="text-gray-500 mt-2">
                    Days Remaining
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-700">
                    Earned Leave
                </h3>

                <p className="text-4xl font-bold text-purple-600 mt-4">
                    12
                </p>

                <p className="text-gray-500 mt-2">
                    Days Remaining
                </p>
            </div>

        </div>
    );
};

export default LeaveBalance;