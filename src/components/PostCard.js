import { Link } from "react-router-dom";

const PostCard = ({ title, author, content, createdAt, _id }) => {
  const maxLength = 100;
  const shortCont =
    content.length > maxLength
      ? content.slice(0, maxLength - 3) + "..."
      : content;

  const maxLengthTitle = 50;
  const shortTitle =
    title.length > maxLengthTitle
      ? title.slice(0, maxLengthTitle - 3) + "..."
      : title;
  const isoDateString = createdAt;

  const dateObject = new Date(isoDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const formattedDate = `${monthName} ${day} ${year}`;

  return (
    <div className="max-w-sm text-white bg-[#1b2021] rounded-lg shadow-md overflow-hidden w-72 h-auto md:w-80 md:h-96 m-auto">
      <div className="bg-gradient-to-r from-red-300 via-purple-300 to-yellow-300 h-48"></div>
      <div className="p-4">
        <Link to={"/blog/" + _id}>
          <h2 className="text-lg font-semibold mb-1">{shortTitle}</h2>
        </Link>
        <p className="text-gray-600 text-xs mb-4">{shortCont}</p>
        <div className="flex items-center">
          <div
            className={
              author?.name === undefined
                ? "text-red-800"
                : "text-sm text-gray-50"
            }
          >
            <p className=" font-medium leading-none">
              - {author?.name === undefined ? "Deleted User" : author?.name}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-gray-600 text-xs flex items-center">
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
