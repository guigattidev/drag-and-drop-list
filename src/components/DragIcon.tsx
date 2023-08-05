const DragIcon = () => {
  return (
    <>
      <svg
        className={`h-6 w-6 text-gray-500 hover:text-yellow-500 cursor-pointer`}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" /> <circle cx="9" cy="5" r="1" /> <circle cx="9" cy="12" r="1" />{' '}
        <circle cx="9" cy="19" r="1" /> <circle cx="15" cy="5" r="1" /> <circle cx="15" cy="12" r="1" />{' '}
        <circle cx="15" cy="19" r="1" />
      </svg>
    </>
  );
};

export default DragIcon;
