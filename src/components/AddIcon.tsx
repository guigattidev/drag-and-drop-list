import { IAddIconProps } from '../helpers/app.interfaces';

const AddIcon = ({ addSubTask }: IAddIconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className={`w-6 h-6 hover:text-blue-500 hover:fill-blue-100 ${
          addSubTask ? 'text-blue-600 fill-blue-100' : 'text-gray-500'
        } cursor-pointer`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </>
  );
};

export default AddIcon;
