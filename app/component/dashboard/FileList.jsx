import Card from "../ui/card";

export default function FileList({ files = [] }) {
  return (
    <div className="space-y-3">
      {files.map((file) => (
        <Card
          key={file.id}
          className="flex items-center justify-between"
        >
          <div>
            <h4 className="font-medium text-white">
              {file.name}
            </h4>

            <p className="text-sm text-zinc-400">
              {file.pages} pages
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}