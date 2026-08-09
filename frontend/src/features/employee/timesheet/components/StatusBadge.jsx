const StatusBadge = ({ status }) => {
    let bgColour = "";
    let textColour = "";

    switch (status) {
        case "Approved":
            bgColour = "bg-green-100";
            textColour = "text-green-700"
            break;

        case "Submitted":
            bgColour = "bg-blue-100";
            textColour = "text-blue-700";
            break;

        case "Draft":
            bgColour = "bg-yellow-100";
            textColour = "text-yellow-700";
            break;

        case "Rejected":
            bgColour = "bg-red-100";
            textColour = "text-red-700";
            break;

        default:
            bgColour = "bg-gray-100";
            textColour = "text-gray-700";
    }

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${bgColour} ${textColour}`}> {status} </span>
    )
}

export default StatusBadge;