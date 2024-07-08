import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  const sales = bookings.reduce((acc, booking) => {
    return acc + booking.totalPrice;
  }, 0);

  console.log({ confirmedStays });
  const occupancy =
    confirmedStays?.reduce((acc, stay) => acc + stay.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookings.length}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
      />

      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={confirmedStays?.length}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
        value={Math.round(occupancy * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
