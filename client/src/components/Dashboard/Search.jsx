import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { IconX } from "@tabler/icons-react";

const Search = ({ value, onChange }) => {
  return (
    <div className="relative w-full max-w-sm md:w-md">
      <Input
        type="text"
        placeholder="Search tasks..."
        className="w-full pr-10 text-sm max-w-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-custom-secondary"
          onClick={() => onChange("")}
        >
          <IconX size={16} />
        </Button>
      )}
    </div>
  );
};

export default Search;
