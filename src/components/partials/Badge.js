function badgeVariantStyling(variant) {
  switch (variant) {
    case "draft":
      return "bg-slate-200 border-slate-400";
    case "ongoing":
      return "bg-sky-200 border-sky-300 text-sky-800";
    case "closed":
      return "bg-slate-600 border-slate-600 text-white";
    default:
      return "bg-white border-slate-400";
  }
}

const Badge = (props) => {
  const { status } = props;

  return (
    <div
      className={`rounded py-0.5 px-2.5 border ${badgeVariantStyling(
        status
      )} capitalize`}
    >
      {status}
    </div>
  );
};

export default Badge;
