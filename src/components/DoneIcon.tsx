import { IDoneIconProps } from '../helpers/app.interfaces';

const DoneIcon = ({ isDone }: IDoneIconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className={`w-6 h-6 text-gray-500 hover:text-green-500 hover:fill-green-100 ${
          isDone && 'text-green-600 fill-green-100'
        } cursor-pointer`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </>
  );
};

export default DoneIcon;
