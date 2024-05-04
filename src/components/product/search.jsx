import { Input } from "../ui/input";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto">
      <Input
        className="flex-1 rounded-md 
        border-gray-300 
        focus:ring-gray-300 
        focus:border-gray-300 sm:text-sm"
        placeholder="Search arts boards"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
