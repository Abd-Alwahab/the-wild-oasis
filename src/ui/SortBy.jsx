import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "";

  function handleSortChange(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }

  return (
    <Select options={options} onChange={handleSortChange} value={currentSort} />
  );
}

export default SortBy;
