import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { label: "All", value: "all" },
          { label: "Discounted", value: "with-discount" },
          { label: "Not Discounted", value: "no-discount" },
        ]}
      />

      <SortBy
        options={[
          { label: "Name (A-Z)", value: "name-asc" },
          { label: "Name (Z-A)", value: "name-desc" },
          { label: "Price (Low - High)", value: "regularPrice-asc" },
          { label: "Price (High - Low)", value: "regularPrice-desc" },
          { label: "Capacity (Low - High)", value: "maxCapacity-asc" },
          { label: "Capacity (High - Low)", value: "maxCapacity-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinsTableOperations;
