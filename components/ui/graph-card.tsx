type GraphCardProps = {
  title: string;
  children: React.ReactNode;
};

export function GraphCard({ title, children }: GraphCardProps) {
  return (
    <div className="border rounded-lg p-4 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
