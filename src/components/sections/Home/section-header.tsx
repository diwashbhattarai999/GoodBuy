interface SectionHeaderProps {
  label: string;
}

const SectionHeader = ({ label }: SectionHeaderProps) => {
  return (
    <div className="flex gap-4 items-center">
      <span className="bg-accent h-10 w-5 rounded-l-md" />
      <h1 className="text-accent font-semibold text-lg">{label}</h1>
    </div>
  );
};

export default SectionHeader;
