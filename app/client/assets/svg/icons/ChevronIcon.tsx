export default function ChevronIcon({
  title,
  customStyle,
}: {
  title: string;
  customStyle: string;
}) {
  return (
    <i title={title}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`w-6 h-6 ${customStyle}`}
      >
        <path
          fillRule="evenodd"
          d="M10.293 16.707a1 1 0 010-1.414L14.586 12l-4.293-4.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </i>
  );
}
