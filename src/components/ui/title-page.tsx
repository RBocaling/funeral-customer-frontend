const TitlePage = ({
  label,
  description,
}: {
  label: string;
  description?: string;
}) => {
  return (
    <div>
      <h2 className="text-gradient text-3xl font-bold">{label}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
};

export default TitlePage;
