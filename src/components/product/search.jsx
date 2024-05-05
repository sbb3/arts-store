import { Input } from "../ui/input";

export default function Search({
  searchTerm,
  setSearchTerm,
  placeholder = "Search arts boards",
}) {
  return (
    <div className="flex items-center w-full max-w-md ">
      <Input
        className="flex-1 rounded-md 
        border-gray-300 
        focus:ring-gray-300 
        focus:border-gray-300 sm:text-sm"
        placeholder={placeholder}
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
